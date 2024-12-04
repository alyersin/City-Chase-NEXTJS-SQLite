const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Favorite",
  tableName: "favorites",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    name: {
      type: "varchar",
    },
    country: {
      type: "varchar",
    },
    latitude: {
      type: "double",
    },
    longitude: {
      type: "double",
    },
    population: {
      type: "varchar",
      nullable: true,
    },
    timeZone: {
      type: "varchar",
      nullable: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      onDelete: "CASCADE",
    },
  },
});
