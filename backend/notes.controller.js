const namePatientShema = require('./models/namePatient')

const addName = async (newNamePatient, phone, problem) => {
  try {
    const name = new namePatientShema({
      namePatient: newNamePatient,
      phone,
      problem
    })

    const saveName = await name.save()

    return saveName;
  } catch (error) {
    console.log(error);
    throw error
  }
}

const getNames = async (userId) => {
  try {
    const names = await namePatientShema.find().sort({ createdAt: -1 });
    return names;
  } catch (error) {
    console.log(error);

    return [];
  }
}

module.exports = {
  addName, getNames
}