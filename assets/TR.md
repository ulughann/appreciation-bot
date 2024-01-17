<img src="./promotional_logo.png" align="right" width="256px" height="256px"/>

# Appreciation-bot

İnsanlara teşekkür etmek için hazırlanmış açık kaynaklı ve ücretsiz bir Discord botu 

[Sunucuna Ekle](https://discord.com/api/oauth2/authorize?client_id=1196863040029732884&permissions=275146729472&scope=bot+applications.commands), [Build Instructions](#build)

<img src="./promotional_material.png">

## Diğer Dillere Göz At

- [Turkish Docs <img height=16 src="https://flagicons.lipis.dev/flags/4x3/tr.svg">]()
- [English Docs <img height=16 src="https://flagicons.lipis.dev/flags/4x3/gb.svg">](../README.md)
- [Japanese Docs](./JA.md) <img height=16 src="https://flagicons.lipis.dev/flags/4x3/jp.svg">
- Korean Docs <img height=16 src="https://flagicons.lipis.dev/flags/4x3/kr.svg"> (Coming soon)

## Özellikler

- [x] Türkçe, İngilizce ve Japonca dil desteği
- [ ] Korece, Almanca ve İspanyolca dil desteği
- [x] Özelleştirilebilir rol ödülleri
- [x] Admin komutları (`/teşekkür-ayarla`, `/bekleme-süresini-ayarla`)
- [x] Özelleştirilebilir bekleme süresi
- [x] Tamamen açık kaynak ve ücretsiz 

## İçerikler

- [Appreciation-bot](#appreciation-bot)
  - [Diğer Dillere Göz At](#diğer-dillere-göz-at)
  - [Özellikler](#özellikler)
  - [İçerikler](#i̇çerikler)
  - [Komutlar](#komutlar)
    - [`/teşekkür-et <@user>`](#teşekkür-et-user)
    - [`/bilgi <@user>?`](#bilgi-user)
    - [`/ödüller`](#ödüller)
    - [`/teşekkür-ayarla <@user> <amount>`](#teşekkür-ayarla-user-amount)
    - [`/bekleme-süresini-ayarla <amount>`](#bekleme-süresini-ayarla-amount)
    - [`/rol-ödülü-ekle <amount> <@role>`](#rol-ödülü-ekle-amount-role)
    - [`/rol-ödülü-kaldır <amount>`](#rol-ödülü-kaldır-amount)
  - [Build Adımları](#build-adımları)
  - [Lisans](#lisans)

## Komutlar

### `/teşekkür-et <@user>`

Belirtilen kullanıcıya teşekkür eder ve teşekkür ettiğiniz kişinin puanını arttırır. Eğer kullanıcı belirtilmezse, komutu kullanan kişinin puanını arttırır.

### `/bilgi <@user>?`

Belirtilen kullanıcının puanını gösterir. Eğer kullanıcı belirtilmezse, komutu kullanan kişinin puanını gösterir.

### `/ödüller`

Sunucudaki rol ödüllerini gösterir.

### `/teşekkür-ayarla <@user> <amount>`

Belirtilen kullanıcının puanını belirtilen miktarda ayarlar. Eğer kullanıcı belirtilmezse, komutu kullanan kişinin puanını ayarlar.

### `/bekleme-süresini-ayarla <amount>`

Teşekkür etme komutunun bekleme süresini belirtilen miktarda ayarlar.

### `/rol-ödülü-ekle <amount> <@role>`

Sunucuya rol ödülü ekler.

### `/rol-ödülü-kaldır <amount>`

Sunucudan rol ödülü kaldırır.

## Build Adımları

1. Clone the repository
2. Install dependencies with `npm install`
3. Add your token to the `config` file
4. Run the bot with `npm start`
5. Invite the bot to your server and enjoy!

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için [LICENSE](../LICENSE) dosyasına göz atın.