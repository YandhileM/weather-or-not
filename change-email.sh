git filter-branch --force --env-filter '
if [ "$GIT_COMMITTER_EMAIL" = "yandile@softidoc.co.za" ]
then
    export GIT_COMMITTER_EMAIL="yandhilemaluleke@gmail.com"
fi
if [ "$GIT_AUTHOR_EMAIL" = "yandile@softidoc.co.za" ]
then
    export GIT_AUTHOR_EMAIL="yandhilemaluleke@gmail.com"
fi
' --tag-name-filter cat -- --branches --tags