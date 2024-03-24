const Court = require("../Repository/court.repository");

class UtilService {
  async getAllCourts() {
    try {
      const data = await Court.getAllCourts();
      // data only contains the court name and _id
      const dataToSend = [];
      data.forEach((court) => {
        dataToSend.push({
          id: court.id,
          name: court.name,
        });
      });
      return dataToSend;
    } catch (error) {
      throw error;
    }
  }
  async getCourtJudgesLawyers(caseData) {
    try {
      const dataToSend = [];
      if (!caseData) return dataToSend;
      if (!caseData.courtId) return dataToSend;
      const court = await Court.getCourtById(caseData.courtId);
      if (!court) return dataToSend;
      const courtData = await Court.getCourtCompleteInfoById(court.id);
      const judges = [];
      const lawyers = [];
      courtData.judges.forEach((judge) => {
        judges.push({
          id: judge.id,
          name: judge.name,
        });
      });
      courtData.lawyers.forEach((lawyer) => {
        lawyers.push({
          id: lawyer.id,
          name: lawyer.name,
        });
      });
      return { judges, lawyers };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UtilService();
