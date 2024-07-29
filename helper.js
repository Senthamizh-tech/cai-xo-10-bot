var xlsx = require("xlsx");

const getExcelData = () => {
    const workbook = xlsx.readFile(`./sampleBatchtesting.xlsx`);  // Step 2
    let workbook_sheet = workbook.SheetNames;                // Step 3
    let workbook_response = xlsx.utils.sheet_to_json(        // Step 4
      workbook.Sheets[workbook_sheet[0]]
    );
    // res.status(200).send({                                   // Step 5
    //   message: workbook_response,
    // });
    return workbook_response;
}

export default getExcelData;
