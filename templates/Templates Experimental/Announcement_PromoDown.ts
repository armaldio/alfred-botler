import { MessageEmbed } from 'discord.js';
import CONSTANTS from '../../constants';
import Template from '../Template';

export default class PromoDown extends Template {
  constructor(variables) {
    super('promo-down', variables, {});
  }

  embed() {
    return new MessageEmbed()
      .setDescription('Your content has been removed from the #promotion channel!')
      .setColor(11962861)
      .setThumbnail('https://raw.githubusercontent.com/Armaldio/alfred-botler/master/assets/mini/Downloadicon.png')
			.setAuthor('PROMOTION REMOVAL SUCCESSFUL!', 'https://raw.githubusercontent.com/Armaldio/alfred-botler/master/assets/mini/AlfredBotlericon.png', '')
			.addField(CONSTANTS.MESSAGE.SEPARATOR, 'ᅠ')
      .addField('Thanks for using Alfred Botler!', 'Donations: http://lnk.armaldio.xyz/donation', false);
  }
}
