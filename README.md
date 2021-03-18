# TURPH-Music

This is a project created by Tur-ph and is fully customizable. *Note: Hosting is not provided, this is for you to self host for you personal reasons.*

## Information

TURPH-Music is a music bot with complete commands, the bot has customizable features which are all listed inside [config.json](https://github.com/Tur-ph/TURPH-Music/blob/master/config.json) file.

Updates are pushed on a regular basis so please keep an eye out and pay attention to the [GitHub Repository](https://github.com/Tur-ph/TURPH-Music) for updates.


## Setup

**This will not detail instructions on how to clone this project. You will need to do that by yourself!**

### [Config File](https://github.com/Tur-ph/TURPH-Music/blob/master/config.json)

*Note: The config file has default values that will work fine currently, these are mainly optional requirements, you are expected to enter your bot token.

**config.json template

```json
{
  "token": "{ INSERT TOKEN }",
  "embed_color": "{ HEX COLOR }",
  "footer_text": "{ FOOTER TEXT }",
  "footer_icon": "{ FOOTER ICON }",
  "thumbnail_image": "{ THUMBNAIL IMAGE }",
  "prefix": "{ PREFIX }",
  "statusActivity": "{ STATUS }",
  "statusType": "{ STATUS TYPE }",
  "id": {
    "ownerId": "{ BOT OWNER USER ID }",
    "djRole": "{ DJ ROLE ID }"
  },
  "emojis": {
    "error": "❌",
    "correct": "✅",
    "warning": "⚠️",
    "info": "ℹ️"
  },
  "distube_options": {
    "searchSongs": "false"
  }
}
```

#### Notes

Field Name | Required | Expectation
--- | --- | ---
TOKEN | true | VALID DISCORD TOKEN
EMBED_COLOR | false | HEX COLOR
FOOTER_TEXT | false | TEXT
FOOTER_ICON | false | IMAGE URL
THUMBNAIL_IMAGE | false | IMAGE URL
PREFIX | true | CHARACTER
STATUSACTIVITY | false | TEXT
STATUSTYPE | false | PLAYING / WATCHING / LISTENING (caps sensitive)
ID/OWNERID | true | DISCORD USER ID
ID/DJROLE | true | DISCORD ROLE ID
EMOJIS/ERROR | true | DEFAULT
EMOJIS/CORRECT | true | DEFAULT
EMOJIS/WARNING | true | DEFAULT
EMOJIS/INFO | true | DEFAULT
DISTUBE_OPTIONS/SEARCHSONGS | true | true / false

**DEFAULT means the field should already have a value inside it, it's your choice wether you would like to change that default value**

**Any expectation (such as STATUSTYPE) must been one of the value given, it cannot be changed and it must he written exactly how it is shown**

**All required fields must be filled in for functionality of the bot**


#### [TURPH Music](https://github.com/Tur-ph/TURPH-Music) is made and maintained by [Tur-ph](https://github.com/Tur-ph)

#### Creditting the developer is optional however taking credit for unchanged code is not allowed, if you do modify it and public it has a *new or fixed* version please give [Tur-ph](https://github.com/Tur-ph) some credit.
