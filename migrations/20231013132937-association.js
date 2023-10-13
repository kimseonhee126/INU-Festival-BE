'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('BoothDays', {
      fields: ['boothId'],
      type: 'foreign key',
      name: 'boothIdFk',
      references: {
        table: 'Booths',
        field: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('BoothDays', 'boothIdFk');
  }
};