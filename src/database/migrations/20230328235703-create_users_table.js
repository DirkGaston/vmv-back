"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
        validate: {
          isEmail: true,
          notNull: true,
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        },
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
        validate: {
          len: [2, 50],
        },
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          isIn: [["guest", "student", "admin"]],
        },
      },
      firstName: {
        field: "first_name",
        allowNull: true,
        type: Sequelize.STRING(50),
        validate: {
          len: [3, 50],
        },
      },
      lastName: {
        field: "last_name",
        allowNull: true,
        type: Sequelize.STRING(50),
        validate: {
          len: [3, 50],
        },
      },
      birthday: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      phoneNumber: {
        field: "phone_number",
        allowNull: true,
        type: Sequelize.STRING(20),
        validate: {
          is: /^(\+56[- ]?)?(\(\d{1,3}\)[- ]?)?\d{3}[- ]?\d{4}$/i,
        },
      },
      emergencyContactName: {
        field: "emergency_contact_name",
        allowNull: true,
        type: Sequelize.STRING(50),
        validate: {
          len: [3, 50],
        },
      },
      emergencyContactPhone: {
        field: "emergency_phone_number",
        allowNull: true,
        type: Sequelize.STRING(20),
        validate: {
          is: /^(\+56[- ]?)?(\(\d{1,3}\)[- ]?)?\d{3}[- ]?\d{4}$/i,
        },
      },
      facebookLink: {
        field: "facebook_link",
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      instagramLink: {
        field: "instagram_link",
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      tiktokLink: {
        field: "tiktok_link",
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      photoUrl: {
        field: "photo_url",
        allowNull: true,
        type: Sequelize.TEXT,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
