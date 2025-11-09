const namePatientShema = require('./models/namePatient')

const addName = async (newNamePatient, phone, problem, owner) => {
  try {
    const name = new namePatientShema({
      namePatient: newNamePatient,
      phone,
      problem,
      owner
    })

    await name.save()

    return name;
  } catch (error) {
    console.log(error);
    throw error
  }
}

const getNames = async (owner) => {
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