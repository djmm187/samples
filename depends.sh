
#!/bin/bash

##
## fetch and unpack EXTJS source
##
echo "Removing any lingering extjs source...";
cd $(git rev-parse --show-toplevel)"/assets";
rm -Rf extjs/;
echo "Fetching source...";
wget "http://cdn.sencha.com/ext/gpl/ext-4.2.1-gpl.zip";
echo "Unpacking source..."
unzip ext-4.2.1-gpl.zip;
mv ext-4.2.1.883 extjs;
echo "Done..."
