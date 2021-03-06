
#!/bin/bash

##
## fetch and unpack EXTJS source
##
echo "Removing any lingering extjs source...";
cd $(git rev-parse --show-toplevel)"/ticketingsystem/assets";
rm -Rf extjs/;
rm -f ext-4.2.1-gpl.zip;
echo "Fetching source...";
wget "http://cdn.sencha.com/ext/gpl/ext-4.2.1-gpl.zip";
echo "Unpacking source..."
unzip ext-4.2.1-gpl.zip;
mv ext-4.2.1.883 extjs;
rm ext-4.2.1-gpl.zip;
echo "Done..."
