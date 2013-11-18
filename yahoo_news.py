"""

NewsScanner (Yahoo)

Default:
    source
        DB location for the default ticker query list (i.e. column name)

    target
        specific column from source table

    tickers
        result set from query (i.e. ['TM', 'MCD', 'BOOB'])

    analyze
        Without this flag, the scan will return a list of tuples
        containing article content, timestamp, and ticker
        (i.e.  [('My article content', datetime obj, 'TM'), ...])

        With this flag, the scan will return something awesome
        that I cannot include in this coding sample

Notes:

    I have excluded one import that I cannot show -
        cli.Command

    This is an interface for common executables. NewsScanner
        implements this base class
        (This have been renamed "mypackage")

"""

import httplib2
import re

from bs4 import BeautifulSoup
from datetime import datetime
from nltk.tokenize import word_tokenize
from mypackage.cli import Command


class NewsScanner(Command):
    """
    Fetches news articles for a ticker or set of tickers
    """

    @staticmethod
    def set_arguments(parser):
        parser.add_argument('-s', '--source', default='tickersource',
                            help='Database for tickers (`tickersource`)')
        parser.add_argument('-t', '--target', default='tickers',
                            help='Table for tickers (`tickers`)')
        parser.add_argument('tickers', metavar='TICKER', nargs='*',
                            help='Ticker(s) to analyze')
        parser.add_argument('-r', '--return', default=None, nargs='*',
                            help="""
                            Return News Articles.
                            True - returns all articles in the ticker set.
                            Strings - Will only return those specific articles.
                            """)

    def main(self):
        """
        overrides Command.main
            sets connection on instance

        if tickers have been specificed, fetch content
        if no tickers have been specified, query for our ticker set
            and fetch news content
        """

        if not len(self.tickers):
            self.tickers = list(self.fetch_tickers())

        self.conn = httplib2.Http()
        self.getlatest(self.tickers)

    def fetch_tickers(self, source=None, target=None):
        """Return a list of all tickers"""

        source = source or self.source
        target = target or self.target

        return self.dbc.fetchvalues(
            "SELECT `ticker` FROM `{}`.`{}`".format(source, target)
        )

    def getlatest(self, ticks=None):
        """
        connect to sources and fetch the latest articles
        (http://finance.yahoo.com/q/h?s={}+Headlines)
        """
        if ticks is None or not len(ticks):
            self.log.info("No Tickers passed")
            return

        for t in ticks:
            try:
                path = "http://finance.yahoo.com/q/h?s={}+Headlines".format(t)
                response, data = self.conn.request(path, "GET")

                soup = BeautifulSoup(data)
                content = soup.find("div", class_="yfi_quote_headline")

                # articles
                articles = [a['href'] for ul in content.find_all('ul')[1:]
                            for a in ul.find_all('a')]
                # timestamps
                ts = [str(s.contents[0]) for h in content.find_all('h3')
                      for s in h.find_all('span')]

                article_contents = [
                    a for a in zip(
                        self.getarticles(articles=articles), ts, articles)]

                self.savearticles(article_contents, t)

            except:
                self.log.exception("Error fetching articles for {}".format(t))
                continue

    def getkeywords(self, words=None):
        """
        returns keywords to be matched in titles
        """
        return words or "the"

    def getarticles(self, **kwargs):
        """ returns list of article content """

        article_content = []
        articles = kwargs.pop('articles', None)

        if articles is None:
            return

        for path in articles:
            response, data = self.conn.request(path, "GET")
            soup = BeautifulSoup(data)

            # remove all of the script tags and contents
            content = [s.extract() for s in soup('style')]
            # join content
            content = "".join([str(r) for r in soup.get_text()])

            article_content.append(content)

        return article_content

    def savearticles(self, articles=None, ticker=None):
        """ save the content from tickers """

        if articles is None or ticker is None:
            return

        self.log.info('Inserting {}'.format(ticker))

        for a in articles:
            self.dbc.execute("""
            INSERT IGNORE INTO `newsrepository`.`news_articles` (
                `ticker`, `content`, `url`, `publish_date`, `date_added`
            ) VALUES (%s, %s, %s, %s, NOW())
            """, (
                ticker,
                a[0],
                a[1],
                a[2]
            ))
