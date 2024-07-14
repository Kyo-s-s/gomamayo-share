# gomamayo-share


### Mecab の導入

以下Ubuntu
https://qiita.com/kado_u/items/e736600f8d295afb8bd9 に従う。

```
$ sudo apt install mecab
$ sudo apt install libmecab-dev
$ sudo apt install mecab-ipadic-utf8
$ git clone https://github.com/neologd/mecab-ipadic-neologd.git
$ cd mecab-ipadic-neologd
$ sudo bin/install-mecab-ipadic-neologd
$ sudo mv /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd /var/lib/mecab/dic
```

```
$ sudo vim /etc/mecabrc

;
; Configuration file of MeCab
;
; $Id: mecabrc.in,v 1.3 2006/05/29 15:36:08 taku-ku Exp $;
;
; dicdir = /var/lib/mecab/dic/debian // <- 先頭に ; 追加
dicdir = /var/lib/mecab/dic/mecab-ipadic-neologd // <- 加筆
; userdic = /home/foo/bar/user.dic

; output-format-type = wakati
; input-buffer-size = 8192

; node-format = %m\n
; bos-format = %S\n
; eos-format = EOS\n
```

```
$ mecab
特急はくたか
特急はくたか
特急    名詞,一般,*,*,*,*,特急,トッキュウ,トッキュー
はくたか        名詞,固有名詞,一般,*,*,*,はくたか,ハクタカ,ハクタカ
EOS
```

になればOKそう