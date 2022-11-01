port=3333
url=http://localhost
uri=pools

echo "$url:$port/$uri"

echo -e ""; time curl -i -H 'Content-Type: application/json' -d '{"title":"Super Copa 2"}' -X POST $url:$port/$uri 
echo -e "";

#curl $url:$port/pools/count
#curl $url:$port/users/count
#curl $url:$port/guesses/count
