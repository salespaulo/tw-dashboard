#### tw-dashboard

Projeto maven parent para agrupar os projetos *nodejs* e *reactjs*

```
$> sudo docker run -d                           \
    --name <nome_container>                     \
    --network <nome_rede>                       \
    -p 4000:4000 tw-dashboard
```

### Change project name

Execute following shell scripts:
```
for i in `find . -type f -name "*" | grep -v node_modules | grep -v \/node\/ | grep -v \/node_tmp\/ | grep -v .git` \
    ; do echo $i                                 \
    && sed 's/tw-dashboard/test-it/g' $i > x  \
    && cat x > $i                                \
    && rm x                                      \
    ; done
```

```
for i in `find . -type f -name "*" | grep -v node_modules | grep -v \/node\/ | grep -v \/node_tmp\/ | grep -v .git` \
    ; do echo $i                                        \
    && sed 's/freunde-von-ideen/test-it-group/g' $i > x  \
    && cat x > $i                                       \
    && rm x                                             \
    ; done
```

```
for i in `find . -type f -name "*" | grep -v node_modules | grep -v \/node\/ | grep -v \/node_tmp\/ | grep -v .git` \
    ; do echo $i                                 \
    && sed 's/17/17/g' $i > x   \
    && cat x > $i                                \
    && rm x                                      \
    ; done
```
