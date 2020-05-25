<h1 align="center">
    Lovelace Apple iPhone XS Card
</h1>

HA Lovelace Card for Apple iPhone XS / X / XR / 11 using sensors data


<p align="center">
    <img src="https://raw.githubusercontent.com/pasleto/lovelace-iphone-xs-card/master/example/card_example.png" alt="Example"/>
</p>

## Setup

Install using [HACS][hacs] using the following custom plugin repository ```https://github.com/pasleto/lovelace-iphone-xs-card```
```yaml
resources:
  - url: /hacsfiles/lovelace-iphone-xs-card/lovelace-iphone-xs-card.js
    type: module
```

OR 

Manually add [lovelace-iphone-xs-card.js] and [iphone_xs.png]
to your `<config>/www/lovelace-iphone-xs-card` folder and add the following to your `configuration.yaml` file:
```yaml
resources:
  - url: /local/lovelace-iphone-xs-card/lovelace-iphone-xs-card.js
    type: module
```



**TODO** - dynamic color ranges on battery percentage

README update coming soon ...



[hacs]: https://github.com/custom-components/hacs
[lovelace-iphone-xs-card.js]: https://raw.githubusercontent.com/pasleto/lovelace-iphone-xs-card/master/dist/lovelace-iphone-xs-card.js
[iphone_xs.png]: https://raw.githubusercontent.com/pasleto/lovelace-iphone-xs-card/master/dist/iphone_xs.png