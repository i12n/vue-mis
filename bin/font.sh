#!/usr/bin/env bash

# MAGIC, session id from cookie
cookie='EGG_SESS=svTNUzx0K3-_wUU5QrEMe4dASq1hJCk0NHUiTlaYHqm0yLc17VxlPOl5yGruFA4XLZe3CjTESj9_MMhQs9eKXr7rjFrnAo0RW6MvB7xt2qrhvIb4vjRXYLvDiCwjZSL2K1e6HXzIA2Gxando2HhvRNyVfqI5fgLStPetBkzl3Kdp_Gp8_wetbHCDwmTRn76jUAWObGVvhdnZJVcPmo8URbnUZN2NmGleVhiZ7LVyhtQV8dlPM0clSphvV80gK1ZZPiW8UisI5Dob9Ebb2U550ogatdY2mhk7X_vLqHf9Iuy3Vz0yJlylI6PCSLSFOkEUWDP8ODofYiT6RTkxwRYilFE9fKMIOLf-pFHnHKoHikZsjxUMPhZyHjh5JQPUhZ2Xs0OGrg3okDHBBHa3J4fQ-C085J0fHDFXMuxlkAL7fUgYLwkz7rP0mGf1x_z59AwmpY5-sx-cuc12GI7WO2fhkMhWAgan30RoHbSF1z9y0o8zOs-GLkz7WN8a4-DbVDoUlejuYsZaLll_18-zITPZQ_wgadsmylH8emOQ7NMEUEJl4Nu7PgO4TGuUMwH4ds-COgpX0tbo5xr9Vr3YrwzIEJ9MVucPMBbGurLyVcfEoK_gkzKhQbdnUgeF3RL5keiCuzldexJLW7uo4j-I8nt4JKoQ75jgp_tTW4XSgSgpRmAvKXqKVZDbI2w0COhqkvDPnOay-lH99pCOgv5IGl_ashFHCge441ENwPhdvT5MjKfNbVFRiSD1UefOyz_bAYJdN71ZInMKFB1T36b68ULJSVJpf6fNfAp1Xprbl79a6k8='

# download iconfont from iconfont.cn
curl -s 'http://iconfont.cn/api/project/download.zip?pid=518632' -H "Cookie: $cookie" > /tmp/iconfont.zip

# extract iconfont files from the ziped package
unzip -jo /tmp/iconfont.zip 'font_*/iconfont.*' -d "public/fonts"

# modify and save
sed 's/iconfont\./\/fonts\/iconfont\./g;s/font-size:16px;/font-size:18px;/g;s/\.iconfont/\.icon/g' public/fonts/iconfont.css >> public/fonts/.iconfont.css.tmp
mv public/fonts/.iconfont.css.tmp public/fonts/iconfont.css
rm -rf static/fonts
cp -R public/fonts static/

