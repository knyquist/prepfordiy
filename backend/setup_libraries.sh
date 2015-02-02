# only necessary to run if development libraries are missing
# must rebuild python after running (you can run this before running setup_env.sh

cat libraries.txt | awk '{system("sudo apt-get install " $1);}'
