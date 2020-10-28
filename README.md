<h1 align="center">
    Lovelace Apple iPhone XS Card
</h1>


<p align="center">
    HA Lovelace Card for Apple iPhone X / XS / XR / 11 / 12 using sensors data
</p>

## Setup

Install using [HACS][hacs] using the following custom plugin repository ```https://github.com/pasleto/lovelace-iphone-xs-card```
```yaml
resources:
  - url: /hacsfiles/lovelace-iphone-xs-card/lovelace-iphone-xs-card.js
    type: module
```

OR 

Manually add content of **dist** folder to your `<config>/www/lovelace-iphone-xs-card` folder and add the following to your `configuration.yaml` file:
```yaml
resources:
  - url: /local/lovelace-iphone-xs-card/lovelace-iphone-xs-card.js
    type: module
```


## Configuration

Build your merged phone sensor (example using Life360 & Icloud & HA App)
This is minimal (required) configuration for this card to function correctly:
```yaml
- platform: template
  sensors:
    tomas_iphone_xs:
      friendly_name_template: >-
        {{ state_attr('device_tracker.tomas_iphone', 'friendly_name') }}
      value_template: >-
        {{ states.device_tracker.tomas.state }}
      icon_template: mdi:cellphone-iphone
      attribute_templates:
        battery: >-
          {{ state_attr('device_tracker.tomas', 'battery') }}
        battery_charging: >-
          {% if state_attr('device_tracker.tomas', 'battery_charging') %}
            true
          {% else %}
            false
          {% endif %}
        battery_status: >-
          {{ state_attr('device_tracker.tomas_iphone_icloud_xs', 'battery_status') }}
        wifi_on: >-
          {% if state_attr('device_tracker.tomas', 'wifi_on') %}
            true
          {% else %}
            false
          {% endif %}
        entity_picture: >-
          {{ state_attr('device_tracker.tomas_iphone_nmap', 'entity_picture') }}
        ssid: >-
          {{ states.sensor.tomas_iphone_ssid.state }}
        sim_1: >-
          {{ states.sensor.tomas_iphone_sim_1.state }}
        sim_2: >-
          {% if states.sensor.tomas_iphone_sim_2.state is defined %}
            {{ states.sensor.tomas_iphone_sim_2.state }}
          {% else %}
            Not present
          {% endif %}
        device_type: >-
          {{ state_attr('device_tracker.tomas_iphone_icloud_xs', 'device_name') }}

```

Add to Lovelace:
```yaml
- type: custom:iphone-xs-card
  entity: sensor.your_phone_sensor
  showSim1: false       # optional - default = true (hide Sim 1)
  showSim2: false       # optional - default = true (hide Sim 2)
  showWifi: false       # optional - default = true (hide Wi-Fi)
  showPlug: false       # optional - default = true (hide charging animation)
```
&nbsp;

[![BMC](https://www.buymeacoffee.com/assets/img/custom_images/white_img.png)](https://www.buymeacoffee.com/pasleto)

[hacs]: https://github.com/custom-components/hacs

