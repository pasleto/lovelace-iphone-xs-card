import { LitElement, html, css } from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

  class IphoneXsCard extends LitElement {

      static get properties() {
          return {
              _hass: {},
              _config: {},
              stateObj: {},
              state: {},
              style: {}
          }
      }

      static get styles() {
          return css`
            .background {
              background-repeat: no-repeat;
              background-position: center center;
              background-size: contain;
            }
            .avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-bottom: 5px;
            }
            .image-box {
              display: flex; 
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-weight: 700;
              font-size: 16px;
              text-align: center;
              margin-bottom: 10px;
            }
            .sim {
              width: 15px;
              height: 20px;
              vertical-align: text-bottom;
              padding-right: 5px;
            }
            .device-type {
              width: 15px;
              height: 20px;
              vertical-align: text-bottom;
              padding-right: 5px;
            }
            .wifi {
              width: 15px;
              height: 20px;
              vertical-align: text-bottom;
              padding-right: 5px;
            }
            .battery-box {
              justify-content: center;
              align-items: center;
              font-weight: 700;
              font-size: 16px;
              text-align: center;
              margin-top: 6px;
            }
            .battery {
              width: 85%;
              height: auto;
              vertical-align: text-bottom;
            }
            .battery-fill-box {
              width: 70%;
              height: 40px;
              margin-top: -45px;
              margin-left: 15px;
              border-radius: 5px;
            }
            .battery-fill {
              height: 100%;
              border-radius: 5px;
            }
            .battery-fill-text {
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: -40px;
            }
            .image-invert {
              filter: var(--image-invert-colors);
            }
            .content {
              cursor: pointer;
              color: var(--primary-text-color);
              text-shadow: none;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              max-width: 140px;
              margin-left: auto;
              margin-right: auto;
              min-height: 300px;
              max-height: 350px;
              height: 100vh;
            }
            .grid-container {
              width: 85%;
              display: grid;
              grid-template-columns: 25px auto;
              grid-template-rows: min-content;
              gap: 0px 0px;
              margin-bottom: 5px;
              font-weight: 700;
              font-size: 16px;
            }
            .icon { 
              grid-area: 1 / 1 / 2 / 2; 
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .text { 
              grid-area: 1 / 2 / 2 / 3; 
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .text span {
              margin-top: 1px;
              margin-bottom: -2px;
            }
            .plug-box {
              justify-content: center;
              align-items: center;
              font-weight: 700;
              font-size: 16px;
              text-align: center;
              margin-top: 4px;
            }
            .plug {
              width: 85%;
              height: auto;
              vertical-align: text-bottom;
            }
          `;
      }

      render() {
          return html`
          <ha-card .hass="${this._hass}" .config="${this._config}" class="background" style="${this.style.background}" @click="${() => this.fireEvent('hass-more-info')}">
            <div class="content" >
                <div class="image-box" style="${this.getValueState('battery_charging') !== 'true' ? 'margin-top: 5px;' : 'margin-top: 20px;'}">
                    <img class="avatar" src="${this.getValueState('entity_picture')}" alt="Avatar" />
                    <span>${this.stateObj.attributes.friendly_name}</span>
                </div>

                <div class="grid-container">
                  <div class="icon"><img class="device-type image-invert" src="/hacsfiles/lovelace-iphone-xs-card/device_type.png" alt="Type" /></div>
                  <div class="text"><span>${this.getValueState('device_type')}</span></div>
                </div>

                ${this.state.showSim1 ? html`
                <div class="grid-container">
                  <div class="icon"><img class="sim image-invert" src="/hacsfiles/lovelace-iphone-xs-card/sim_1.png" alt="Sim1" /></div>
                  <div class="text"><span>${this.getValueState('sim_1')}</span></div>
                </div>` : null}
                ${this.state.showSim2 ? html`
                <div class="grid-container">
                  <div class="icon"><img class="sim image-invert" src="/hacsfiles/lovelace-iphone-xs-card/sim_2.png" alt="Sim2" /></div>
                  <div class="text"><span>${this.getValueState('sim_2')}</span></div>
                </div>` : null}
               
                ${this.state.showWifi ? html`
                <div class="grid-container">
                  <div class="icon"><img class="wifi image-invert" src="/hacsfiles/lovelace-iphone-xs-card/wifi.png" alt="WiFi" /></div>
                  <div class="text"><span>${this.getValueState('wifi_on')}</span></div>
                </div>` : null}

                <div class="battery-box" >
                  <img class="battery image-invert" src="/hacsfiles/lovelace-iphone-xs-card/battery.png" alt="Bat" />
                  <div class="battery-fill-box">
                    <div class="battery-fill" style="width: ${this.getBatteryPercentage()}%; background-color: ${this.getBatteryColor()};"></div>
                    <div class="battery-fill-text">${this.getValueState('battery')}%</div>
                  </div>
                </div>

                ${this.state.showPlug ? html`
                <div class="plug-box" style="${this.getValueState('battery_charging') !== 'true' ? 'display: none;' : ''}">
                  <img class="plug image-invert" src="/hacsfiles/lovelace-iphone-xs-card/plug.png" alt="Plug" />
                </div>
                ` : null}
            </div>
          </ha-card>`;
      }

      getValueState(field) {
          const value = (this.stateObj && this.state.attributes[field] in this.stateObj.attributes)
              ? this.stateObj.attributes[this.state.attributes[field]]
              : (this._hass ? this._hass.localize('state.default.unavailable') : 'Unavailable');

          if(field === 'wifi_on'){
            if(value === this._hass.localize('state.default.unavailable') || value === 'Unavailable'){
              return `Unavailable`;
            } else if(value === 'true'){
                if(this.getValueState('ssid')){ // if exists
                  if(this.getValueState('ssid') === this._hass.localize('state.default.unavailable') || value === 'Unavailable' || this.getValueState('ssid') === 'Not Connected'){ // if unavailable or not connected
                    return `ON`;
                  } else {
                    return this.getValueState('ssid');
                  }
                }
            } else {
              return `OFF`;
            }
          }

          if(field === 'battery'){
            if(this.getValueState('battery_charging') === 'true'){
              return html`&sim; ${value}`;
            } else {
              return `${value}`;
            }
          }

          return `${value}`;
      };

      getBatteryColor() {
          const value = (this.stateObj && this.state.attributes['battery'] in this.stateObj.attributes)
              ? this.stateObj.attributes[this.state.attributes['battery']]
              : (this._hass ? this._hass.localize('state.default.unavailable') : 'Unavailable');
          if(value === this._hass.localize('state.default.unavailable') || value === 'Unavailable' || value === 'None'){
            return 'rgba(119, 119, 119, 0.75)'; // unavailable || none
          } else if(Number(value) < 11){ // below 11
            return 'rgba(213, 0, 0, 0.75)';
          } else if(Number(value) < 21){ // below 21
            return 'rgba(244, 67, 54, 0.75)';
          } else if(Number(value) < 31){ // below 31
            return 'rgba(221, 44, 0, 0.75)';
          } else if(Number(value) < 41){ // below 41
            return 'rgba(230, 81, 0, 0.75)';
          } else if(Number(value) < 51){ // below 51
            return 'rgba(255, 109, 0, 0.75)';
          } else if(Number(value) < 61){ // below 61
            return 'rgba(245, 124, 0, 0.75)';
          } else if(Number(value) < 71){ // below 71
            return 'rgba(255, 193, 7, 0.75)';
          } else if(Number(value) < 81){ // below 81
            return 'rgba(255, 214, 0, 0.75)';
          } else if(Number(value) < 91){ // below 91
            return 'rgba(174, 234, 0, 0.75)';
          } else if(Number(value) < 96){ // below 91
            return 'rgba(100, 221, 23, 0.75)';
          } else { // else
            return 'rgba(118, 255, 3, 0.75)';
          }
      };

      getBatteryPercentage() {
        const value = (this.stateObj && this.state.attributes['battery'] in this.stateObj.attributes)
              ? this.stateObj.attributes[this.state.attributes['battery']]
              : (this._hass ? this._hass.localize('state.default.unavailable') : 'Unavailable');
          if(value === this._hass.localize('state.default.unavailable') || value === 'Unavailable'){
            return `0`;
          } else {
            return `${value}`;
          }
      }

      getImage() {
        return `<img src=${this.stateObj.attributes.entity_picture} />`
      }

      fireEvent(type, options = {}) {
          const event = new Event(type, { bubbles: options.bubbles || true, cancelable: options.cancelable || true, composed: options.composed || true });
          event.detail = {entityId: this.stateObj.entity_id};
          this.dispatchEvent(event);
      }

      getCardSize() {
          return 8;
      }

      setConfig(config) {
          const attributes = {
              battery: 'battery',
              battery_charging: 'battery_charging',
              moving: 'moving',
              wifi_on: 'wifi_on',
              entity_picture: 'entity_picture',
              gps_accuracy: 'gps_accuracy',
              ssid: 'ssid',
              ip: 'ip',
              sim_1: 'sim_1',
              sim_2: 'sim_2',
              device_type: 'device_type',
              battery_status: 'battery_status',
          };

          if (!config.entity) throw new Error('Please define an entity.');
          if (config.entity.split('.')[0] !== 'sensor') throw new Error('Please define a sensor entity.');

          this.state = {
              showSim1: config.showSim1 !== false,
              showSim2: config.showSim2 !== false,
              showWifi: config.showWifi !== false,
              showPlug: config.showPlug !== false,

              attributes: Object.assign({}, attributes, config.attributes)
          };

          this.style = {
            background: `background-image: url('/hacsfiles/lovelace-iphone-xs-card/iphone_xs.png')`
            //background: `background-image: url('/local/my-cards/iphone-xs-card/iphone_xs.png')`
          };

          this._config = config;
      }

      set hass(hass) {
          this._hass = hass;

          if (hass && this._config) {
              this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;
          }
      }
  }

  customElements.define('iphone-xs-card', IphoneXsCard);
