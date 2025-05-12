import {DataTypes} from 'sequelize'
import { sequelize } from '../db.js';


const Gadget = sequelize.define("Gadget", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("Available", "Deployed", "Destroyed", "Decommissioned"),
    defaultValue: "Available",
  },
  decommissionedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
})





export default Gadget;
