'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('BoothDays', {
      fields: ['booth_id'],
      type: 'foreign key',
      name: 'booth_id_fk',
      references: {
        table: 'Booths',
        field: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('BoothDays', 'booth_id_fk');
  }
};