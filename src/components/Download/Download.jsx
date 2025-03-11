import React from "react";

class Download extends React.Component {
  parseDate(date){
    if(date !== undefined && date !== null){
      let dd = date.substring(0, 2)
      let mm = date.substring(3, 5)
      let yyyy = date.substring(6, 10)
      var convertedDate = String(yyyy + '-' + mm + '-' + dd)
      let newDate = new Date(convertedDate) // "2017-01-26"
      dd = String(newDate.getDate()).padStart(2, '0')
      mm = String(newDate.getMonth() + 1).padStart(2, '0') //January is 0!
      yyyy = newDate.getFullYear()
      convertedDate = yyyy + '-' + mm + '-' + dd
    }
    return convertedDate
  }
  getEnumValueText(enumName){
    if(this.props.selectedDoc === null){
      // console.log("ENUMS", enumName)
      for(let i=0; i < this.props.enumData.length; i++){
        for(let l=0; l < this.props.enumData[i].data.length; l++){
          if(this.props.enumData[i].data[l].Id === enumName){
            // console.log("ENUMS", enumName)
            return(this.props.enumData[i].data[l].Text)
          }
        }
      }
    }
    else{
      for(let i=0; i < this.props.selectedDoc.attributes.length; i++){
        if(this.props.selectedDoc.attributes[i].name === enumName){
          return this.props.selectedDoc.attributes[i].enumValueText
        }
      }
      for(let i=0; i < this.props.selectedDoc.attributes.length; i++){
        if(this.props.selectedDoc.attributes[i].name === "AdultsMedicalCart"){
          for(let l=0; l < this.props.selectedDoc.attributes[i].subDocument.attributes.length; l++){
            if(this.props.selectedDoc.attributes[i].subDocument.attributes[l].name === enumName){
              // console.log("ENUM", this.props.selectedDoc.attributes[i].subDocument.attributes[l].enumValueText)
              return this.props.selectedDoc.attributes[i].subDocument.attributes[l].enumValueText
            }
          }
        }
      }
    }
    
  }
    sectionBuilderDownload(section, index){
      let number = index + 1
      if(this.props.downloadType === "downloadExcel"){
        if(this.props.Form.formName === "AdultsMedicalCertificateForm"){
          if(section.name === "detailedFormSection"){
            let No = ''
            let DateOfReg = ''
            if (this.props.fieldValue["No"] !== undefined) {
              No = "№ регистрации: " + this.props.fieldValue["No"] + ", "
            }
            if(this.props.fieldValue["Date"] !== undefined){
              DateOfReg = "Дата регистрации: " + this.parseDate(this.props.fieldValue["Date"])
            }
            return(
              <tbody>
                <tr>
                  <td data-b-a-s="thin" data-f-bold="true">{number}</td>
                  <th data-b-a-s="thin" data-f-bold="true" data-a-h="center">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {No + DateOfReg}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "PersonData"){
            let Last_Name = ''
            let First_Name = ''
            let Middle_Name = ''
            let Date_of_Birth = ''
            let PassportNo = ''
            let Issuing_Authority = ''
            let Date_of_Issue = ''  
            let Sex = ''
            for(let i=0; i < this.props.person.attributes.length; i++){
              if(this.props.person.attributes[i].name === "Last_Name"){
                Last_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "First_Name"){
                First_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Middle_Name"){
                Middle_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Birth"){
                Date_of_Birth = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "PassportNo"){
                PassportNo = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Issuing_Authority"){
                Issuing_Authority = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Issue"){
                Date_of_Issue = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "Sex"){
                Sex = this.props.person.attributes[i].enumValueText
              }
            }  
            return(
              <tbody>
                <tr>
                  <td data-b-a-s="thin" data-f-bold="true">{number}</td>
                  <th data-b-a-s="thin" data-f-bold="true">Заявитель</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">ФИО</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {Last_Name + " " + First_Name + " " + Middle_Name }</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {"№ " + PassportNo + ", выдан: " + Date_of_Issue + " " + Issuing_Authority}
                  </td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Дата рождения/пол</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {Date_of_Birth + ", пол: " + Sex}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "personDetailFormSection"){
            let Country = ''
            let Region = ''
            let District = ''
            let subDistrict = ''
            let Village = ''
            let Phone = ''
            let ResidentialAddress = ''
            if (this.props.fieldValue["Country"] !== undefined) {
              
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  Country = this.props.SOAT.countries[i].name + ", "
                }
              }
            }
            if (this.props.fieldValue["Region"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      Region = this.props.SOAT.countries[i].regions[l].name + ", "
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["District"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          District = this.props.SOAT.countries[i].regions[l].districts[m].name + ", "
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["subDistrict"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts !== undefined){
                            for(let n=0; n < this.props.SOAT.countries[i].regions[l].districts[m].subDistricts.length; n++){
                              if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].code === this.props.fieldValue["subDistrict"]){
                                subDistrict = this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].name + ", "
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["Village"] !== undefined) {
              Village = this.props.fieldValue["Village"] + ", "
            }
            if (this.props.fieldValue["Phone"] !== undefined) {
              Phone = "Тел: " + this.props.fieldValue["Phone"] + ", "
            }
            if (this.props.fieldValue["ResidentialAddress"] !== undefined) {
              ResidentialAddress = "дом/кв/ул: " + this.props.fieldValue["ResidentialAddress"]
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">Адресные данные заявителя</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {Country + " " + Region + " " + District  + " " + subDistrict + " " + Village + " " + Phone + " " + ResidentialAddress}</td>
                </tr>
    
              </tbody>
            )
          }
          else if(section.name === "presence"){
            let RegNoAct = ''
            let MedicalOrgName = ''
            let MedicalOrgAddress = ''
            let EducationAct = ''
            let Occupation = ''
            let ExaminationPrRe = ''
            let ExaminationPlace = ''        
            if (this.props.fieldValue["RegNoAct"] !== undefined) {
              RegNoAct = "№ акта по МСЭК: " + this.props.fieldValue["RegNoAct"] + ", "
            }
            if(this.props.fieldValue["MedicalOrgName"] !== undefined){
              MedicalOrgName = "Наименование лечебной организации направившей на МСЭК: " + this.props.fieldValue["MedicalOrgName"] + ", "
            }
            if(this.props.fieldValue["MedicalOrgAddress"] !== undefined){
              MedicalOrgAddress = "Адрес направившей лечебной организации: " + this.props.fieldValue["MedicalOrgAddress"] + ", "
            }
            if(this.props.fieldValue["EducationAct"] !== undefined){
              EducationAct = "Образование: " + this.getEnumValueText("EducationAct") + ", " //this.props.fieldValue["EducationAct"] 
            }
            if(this.props.fieldValue["Occupation"] !== undefined){
              Occupation =  "Род деятельности: " + this.getEnumValueText("Occupation") + ", "
            }
            if(this.props.fieldValue["ExaminationPrRe"] !== undefined){
              ExaminationPrRe = "Освидетельствование: " +  this.getEnumValueText("ExaminationPrRe") + ", "
            }
            if(this.props.fieldValue["ExaminationPlace"] !== undefined){
              ExaminationPlace = "Место освидетельствования: " + this.getEnumValueText("ExaminationPlace")
            } 
            return(
              <tbody>
                <tr>
                  <th 
                  data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th 
                  data-b-a-s="thin" data-f-bold="true"
                 >{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td 
                  data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {RegNoAct + MedicalOrgName + MedicalOrgAddress + EducationAct + Occupation + ExaminationPrRe + ExaminationPlace}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "goalSurvey"){
            let goal1 = ''
            let goal2 = ''
            let goal3 = ''
            let goal4 = ''
            let goal5 = ''
            let goal6 = ''
            let goal7 = ''
            let goal8 = ''
            let goal9 = ''
            let goalAnother = ''        
            if (this.props.fieldValue["goal1"] === true || this.props.fieldValue["goal1"] ==="True") {
              goal1 = "Для установления группы инвалидности, "
            }
            if(this.props.fieldValue["goal2"] === true || this.props.fieldValue["goal2"] ==="True"){
              goal2 = "Изменение причины инвалидности, "
            }
            if(this.props.fieldValue["goal3"] === true || this.props.fieldValue["goal3"] ==="True"){
              goal3 = "Определение степени утраты трудоспособности в %, "
            }
            // if(this.props.fieldValue["goal4"] === true || this.props.fieldValue["goal4"] ==="True"){
            //   goal4 = "Дом интернат, "
            // }
            // if(this.props.fieldValue["goal5"] === true || this.props.fieldValue["goal5"] ==="True"){
            //   goal5 =  "Заключение на: кресло-коляски, "
            // }
            // if(this.props.fieldValue["goal6"] === true || this.props.fieldValue["goal6"] ==="True"){
            //   goal6 =  "По ухудшению, "
            // }
            // if(this.props.fieldValue["goal7"] === true || this.props.fieldValue["goal7"] ==="True"){
            //   goal7 =  "Нуждается в специализированных средствах помощи (коляски, слуховой аппарат, и т.д.), "
            // }
            // if(this.props.fieldValue["goal8"] === true || this.props.fieldValue["goal8"] ==="True"){
            //   goal8 =  "Нуждается в протезно-ортопедических средствах, помощи специализированных учреждений (санаторно-курортное лечение, интернаты, дома престарелых, и т.д.), "
            // }
            // if(this.props.fieldValue["goal9"] === true || this.props.fieldValue["goal9"] ==="True"){
            //   goal9 =  "Оформление/продление листков нетрудоспособности, и т.д.), "
            // }
            // if(this.props.fieldValue["goalAnother"] !== undefined){
            //   goalAnother = "Другое: " + this.props.fieldValue["goalAnother"]
            // }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {goal1 + goal2 + goal3 + goal4 + goal5 + goal6 + goal7 + goal8 + goal9 + goalAnother}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "additionalnformation"){
            let PlaceOfWork = ''
            let Position = ''
            let Wage = ''
            let PensionStatus = ''
            let PensionAmount = ''
            let TimeWork = ''
            let Profession = '' 
            let Height = '' 
            let Weight = ''        
            if (this.props.fieldValue["PlaceOfWork"] !== undefined) {
              PlaceOfWork = "Место работы: "  + this.props.fieldValue["PlaceOfWork"] + ", "
            }
            if (this.props.fieldValue["Position"] !== undefined) {
              Position = "Должность: "  + this.props.fieldValue["Position"] + ", "
            }
            if (this.props.fieldValue["Wage"] !== undefined) {
              Wage = "Среднемесячный заработок в последний год: "  + this.props.fieldValue["Wage"] + ", "
            }
            if (this.props.fieldValue["PensionStatus"] !== undefined) {
              PensionStatus = "Получает пенсию: "  + this.getEnumValueText("PensionStatus") + ", "
            }
            if (this.props.fieldValue["PensionAmount"] !== undefined) {
              PensionAmount = "Размер пенсии: "  + this.props.fieldValue["PensionAmount"] + ", "
            }
            if (this.props.fieldValue["TimeWork"] !== undefined) {
              TimeWork = "Где и с какого времени работает: "  + this.props.fieldValue["TimeWork"] + ", "
            }
            if (this.props.fieldValue["Profession"] !== undefined) {
              Profession = "Основная профессия: "  + this.props.fieldValue["Profession"]
            }
            if(this.props.fieldValue["Height"] !== undefined){
              Height = "Рост: "  + this.props.fieldValue["Height"]
            }
            if(this.props.fieldValue["Weight"] !== undefined){
              Weight = "Вес: "  + this.props.fieldValue["Weight"]
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {PlaceOfWork + Position + Wage + PensionStatus + PensionAmount + TimeWork + Profession + Height + Weight}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "houseConditions"){
            let Good = ''
            let Satisfactory = ''
            let Unsatisfactory = ''
            let SeparateApartment = ''
            let OwnHouse = ''
            let Dormitory = ''
            let LivingAreaRemovable = ''  
            let NoOwnAccommodation = ''       
            let Additionally = '' 
            if (this.props.fieldValue["Good"] === true || this.props.fieldValue["Good"] ==="True") {
              Good = "хорошие, "
            }
            if(this.props.fieldValue["Satisfactory"] === true || this.props.fieldValue["Satisfactory"] ==="True"){
              Satisfactory = "удовлетворительные, "
            }
            if(this.props.fieldValue["Unsatisfactory"] === true || this.props.fieldValue["Unsatisfactory"] ==="True"){
              Unsatisfactory = "неудовлетворительные, "
            }
            if(this.props.fieldValue["SeparateApartment"] === true || this.props.fieldValue["SeparateApartment"] ==="True"){
              SeparateApartment = "отдельная квартира, "
            }
            if(this.props.fieldValue["OwnHouse"] === true || this.props.fieldValue["OwnHouse"] ==="True"){
              OwnHouse =  "собственный дом, "
            }
            if(this.props.fieldValue["Dormitory"] === true || this.props.fieldValue["Dormitory"] ==="True"){
              Dormitory =  "общежитие, "
            }
            if(this.props.fieldValue["LivingAreaRemovable"] === true || this.props.fieldValue["LivingAreaRemovable"] ==="True"){
              LivingAreaRemovable = "жилая площадь съемная, "
            }
            if(this.props.fieldValue["NoOwnAccommodation"] === true || this.props.fieldValue["NoOwnAccommodation"] ==="True"){
              NoOwnAccommodation = "нет собственного жилья, "
            }
            if(this.props.fieldValue["Additionally"] === true || this.props.fieldValue["Additionally"] ==="True"){
              Additionally = "другое"
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {Good + Satisfactory + Unsatisfactory + SeparateApartment + OwnHouse + Dormitory + LivingAreaRemovable + NoOwnAccommodation + Additionally}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "HowToDoJob"){
            let Easily = ''
            let Difficulties = ''
            let CantManage = ''
            let FullTimeWork = ''
            let PartTime = ''
            let AnIncomWorkWeek = ''
            let AdditionalInterruptions = ''
            if (this.props.fieldValue["Easily"] === true || this.props.fieldValue["Easily"] ==="True") {
              Easily  = "Легко, "
            }
            if(this.props.fieldValue["Difficulties"] === true || this.props.fieldValue["Difficulties"] ==="True"){
              Difficulties = "С трудом, "
            }
            if(this.props.fieldValue["CantManage"] === true || this.props.fieldValue["CantManage"] ==="True"){
              CantManage = "Не справляется, "
            }
            if(this.props.fieldValue["FullTimeWork"] === true || this.props.fieldValue["FullTimeWork"] ==="True"){
              FullTimeWork = "Полный рабочий день, "
            }
            if(this.props.fieldValue["PartTime"] === true || this.props.fieldValue["PartTime"] ==="True"){
              PartTime =  "Неполным рабочим днем, "
            }
            if(this.props.fieldValue["AnIncomWorkWeek"] === true || this.props.fieldValue["AnIncomWorkWeek"] ==="True"){
              AnIncomWorkWeek =  "Неполной рабочей неделей, "
            }
            if(this.props.fieldValue["AdditionalInterruptions"] === true || this.props.fieldValue["AdditionalInterruptions"] ==="True"){
              AdditionalInterruptions = "Дополнительными перерывами, "
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {Easily + Difficulties + CantManage + FullTimeWork + PartTime + AnIncomWorkWeek + AdditionalInterruptions}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "WorkingConditions"){
            let WorkingConditions1 = ''
            let WorkingConditions2 = ''
            let WorkingConditions3 = ''
            let WorkingConditions4 = ''
            let WorkingConditions5 = ''
            let WorkingConditions6 = ''
            let WorkingConditions7 = ''  
            if (this.props.fieldValue["WorkingConditions1"] === true || this.props.fieldValue["WorkingConditions1"] ==="True") {
              WorkingConditions1 = "Нервно-психическое напряжение, "
            }
            if (this.props.fieldValue["WorkingConditions2"] === true || this.props.fieldValue["WorkingConditions2"] ==="True") {
              WorkingConditions2 = "Предписанный темп работы, "
            }
            if (this.props.fieldValue["WorkingConditions3"] === true || this.props.fieldValue["WorkingConditions3"] ==="True") {
              WorkingConditions3 = "Рабочая поза, "
            }
            if (this.props.fieldValue["WorkingConditions4"] === true || this.props.fieldValue["WorkingConditions4"] ==="True") {
              WorkingConditions4 = "Сложность/напряженность, "
            }
            if (this.props.fieldValue["WorkingConditions5"] === true || this.props.fieldValue["WorkingConditions5"] ==="True") {
              WorkingConditions5 = "Физический труд, "
            }
            if (this.props.fieldValue["WorkingConditions6"] === true || this.props.fieldValue["WorkingConditions6"] ==="True") {
              WorkingConditions6 = "Умственный труд, "
            }
            if (this.props.fieldValue["WorkingConditions7"] === true || this.props.fieldValue["WorkingConditions7"] ==="True") {
              WorkingConditions7 = "Надомный труд, "
            }
            
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {WorkingConditions1 + WorkingConditions2 + WorkingConditions3 + WorkingConditions4 + WorkingConditions5 + WorkingConditions6 + WorkingConditions7}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Results"){
            let ExpertExamResult = ''
            let ExpertExamResult1 = ''
            let ExpertExamResult2 = ''
            let ExpertExamResult3 = ''
            let ExpertExamResult4 = ''
            let ExpertExamResult4Comment = ''
            let ExpertExamResult5 = ''
            let ExpertExamResult5Comment = ''
            let ExpertExamResult6 = ''
            let ExpertExamResult6Comment = ''
            let ExpertExamResult7 = ''
            let ExpertExamResult7Comment = ''
            let ExpertExamResult9 = ''
            let ExpertExamResult9Comment = ''
            let ExpertExamResult10 = ''
            let ExpertExamResult10Comment = ''
             let ExpertExamResult8 = '' //доктора др спец-й
            if (this.props.fieldValue["ExpertExamResult"] !== undefined) {
              ExpertExamResult = this.props.fieldValue["ExpertExamResult"]
            }
            if (this.props.fieldValue["ExpertExamResult1"] !== undefined) {
              ExpertExamResult1 =this.props.fieldValue["ExpertExamResult1"]
            }
            if (this.props.fieldValue["ExpertExamResult2"] !== undefined) {
              ExpertExamResult2 = this.props.fieldValue["ExpertExamResult2"]
            }
            if (this.props.fieldValue["ExpertExamResult3"] !== undefined) {
              ExpertExamResult3 = this.props.fieldValue["ExpertExamResult3"]
            }
            if (this.props.fieldValue["ExpertExamResult4"] !== undefined) {
              ExpertExamResult4 = this.props.fieldValue["ExpertExamResult4"]
            }
            if (this.props.fieldValue["ExpertExamResult4Comment"] !== undefined) {
              ExpertExamResult4Comment = this.props.fieldValue["ExpertExamResult4Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult5"] !== undefined) {
              ExpertExamResult5 = this.props.fieldValue["ExpertExamResult5"]
            }
            if (this.props.fieldValue["ExpertExamResult5Comment"] !== undefined) {
              ExpertExamResult5Comment = this.props.fieldValue["ExpertExamResult5Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult6"] !== undefined) {
              ExpertExamResult6 = this.props.fieldValue["ExpertExamResult6"]
            }
            if (this.props.fieldValue["ExpertExamResult6Comment"] !== undefined) {
              ExpertExamResult6Comment = this.props.fieldValue["ExpertExamResult6Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult7"] !== undefined) {
              ExpertExamResult7 = this.props.fieldValue["ExpertExamResult7"]
            }
            if (this.props.fieldValue["ExpertExamResult7Comment"] !== undefined) {
              ExpertExamResult7Comment = this.props.fieldValue["ExpertExamResult7Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult9"] !== undefined) {
              ExpertExamResult9 = this.props.fieldValue["ExpertExamResult9"]
            }
            if (this.props.fieldValue["ExpertExamResult9Comment"] !== undefined) {
              ExpertExamResult9Comment = this.props.fieldValue["ExpertExamResult9Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult10"] !== undefined) {
              ExpertExamResult10 = this.props.fieldValue["ExpertExamResult10"]
            }
            if (this.props.fieldValue["ExpertExamResult10Comment"] !== undefined) {
              ExpertExamResult10Comment = this.props.fieldValue["ExpertExamResult10Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult8"] !== undefined) {
              ExpertExamResult8 = this.props.fieldValue["ExpertExamResult8"]
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Жалобы</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Клинико-трудовой анамнез</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult1}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные лабораторных и рентгенологических исследований</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult2}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Результаты доп. спец-х исследований</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult3}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные врача-терапевта</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult4}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult4Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные врача-хирурга</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult5}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult5Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные врача-офтальмолога</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult6}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult6Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные эксперта невропатолога и психиатра</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult7}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult7Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные эксперта окулиста</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult9}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult9Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные эксперта кардиолога</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult10}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult10Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные врачей других специальностей</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult8}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Diagnosis"){
            let Diagnosis = ''
            let MainDiagnosis = ''
            let CompanionDiagnosis = ''
            let DiseaseComplication = ''
            let CompainDagnosisMKB1 = ''
            let CompainDagnosisMKB2 = ''
            let CompainDagnosisMKB3 = ''
            
            if (this.props.fieldValue["Diagnosis"] !== undefined){
              Diagnosis = this.getEnumValueText("Diagnosis")
            }
            if (this.props.fieldValue["MainDiagnosis"] !== undefined){
              MainDiagnosis = this.props.fieldValue["MainDiagnosis"]
            }
            if (this.props.fieldValue["CompanionDiagnosis"] !== undefined){
              CompanionDiagnosis = this.props.fieldValue["CompanionDiagnosis"]
            }
            if (this.props.fieldValue["DiseaseComplication"] !== undefined){
              DiseaseComplication = this.props.fieldValue["DiseaseComplication"]
            }
            if (this.props.fieldValue["CompainDagnosisMKB1"] !== undefined){
              CompainDagnosisMKB1 = this.getEnumValueText("CompainDagnosisMKB1")
            }
            if (this.props.fieldValue["CompainDagnosisMKB2"] !== undefined){
              CompainDagnosisMKB2 = this.getEnumValueText("CompainDagnosisMKB2")
            }
            if (this.props.fieldValue["CompainDagnosisMKB3"] !== undefined){
              CompainDagnosisMKB3 = this.getEnumValueText("CompainDagnosisMKB3")
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Диагноз</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {Diagnosis}</td>
                </tr> 
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Основной</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {MainDiagnosis}</td>
                </tr> 
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Сопутствующий</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {CompanionDiagnosis}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Осложнение болезни</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {DiseaseComplication}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Соп. диагноз по МКБ 1</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {CompainDagnosisMKB1}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Соп. диагноз по МКБ 2</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {CompainDagnosisMKB2}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Соп. диагноз по МКБ 3</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {CompainDagnosisMKB3}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "ExpertDecision"){
            let DisabilityGroup = '' //Enum
            let DisabilityReason = ''//Enum
            let WorkingConditions = ''//Enum
            let NeedsSupervision = ''//Bool
            let NeedsCare = ''//Bool
            let RestorativeTherapy = ''//Bool
            let ReconstructiveSurgery = ''//Bool
            let HospitalTreatment = ''//Bool
            let Hospitalization = ''//Bool
            
            if (this.props.fieldValue["DisabilityGroup"] !== undefined) {
              DisabilityGroup = "Группа инвалидности: " + this.getEnumValueText("DisabilityGroup") + ", "
            }
            if (this.props.fieldValue["DisabilityReason"] !== undefined) {
              DisabilityReason = "Причина инвалидности: " + this.getEnumValueText("DisabilityReason") + ", "
            }
            if (this.props.fieldValue["WorkingConditions"] !== undefined) {
              WorkingConditions = "Показанные и противопоказанные условия труда: " + this.getEnumValueText("WorkingConditions")+ "/ "
            }
            if (this.props.fieldValue["NeedsSupervision"] === true || this.props.fieldValue["NeedsSupervision"] ==="True") {
              NeedsSupervision  = "Нуждается в надзоре, "
            }
            if (this.props.fieldValue["NeedsCare"] === true || this.props.fieldValue["NeedsCare"] ==="True") {
              NeedsCare  = "Нуждается в уходе, "
            }
            if (this.props.fieldValue["RestorativeTherapy"] === true || this.props.fieldValue["RestorativeTherapy"] ==="True") {
              RestorativeTherapy  = "Восстановительная терапия, "
            }
            if (this.props.fieldValue["ReconstructiveSurgery"] === true || this.props.fieldValue["ReconstructiveSurgery"] ==="True") {
              ReconstructiveSurgery  = "Реконструктивная  хирургия, "
            }
            if (this.props.fieldValue["HospitalTreatment"] === true || this.props.fieldValue["HospitalTreatment"] ==="True") {
              HospitalTreatment  = "Амбулаторное лечение, "
            }
            if (this.props.fieldValue["Hospitalization"] === true || this.props.fieldValue["Hospitalization"] ==="True") {
              Hospitalization  = "Стационарное лечение, "
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {DisabilityGroup + DisabilityReason + WorkingConditions + NeedsSupervision + NeedsCare + RestorativeTherapy + RestorativeTherapy + ReconstructiveSurgery + HospitalTreatment + Hospitalization}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "DisabilityPeriod"){
            let ExamDateFrom = '' //DateTime
            let ExamDateTo = ''//DateTime
            let Indefinitely = ''//Bool
            let ReferenceNumber = ''//Text
            
            if (this.props.fieldValue["ExamDateFrom"] !== undefined) {
              ExamDateFrom = "Инвалидность установлена с: " + this.parseDate(this.props.fieldValue["ExamDateFrom"]) + ", "
            }
            if (this.props.fieldValue["ExamDateTo"] !== undefined) {
              ExamDateTo = "Инвалидность установлена по: " + this.parseDate(this.props.fieldValue["ExamDateTo"]) + ", "
            }
            if (this.props.fieldValue["Indefinitely"] === true || this.props.fieldValue["Indefinitely"] ==="True") {
              Indefinitely = "Бессрочно, " 
            }
            if (this.props.fieldValue["ReferenceNumber"] !== undefined) {
              ReferenceNumber  = "№/Серия справки: " + this.props.fieldValue["ReferenceNumber"]
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExamDateFrom + ExamDateTo + Indefinitely + ReferenceNumber}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "SickLists"){
            let SickListType = '' //Text
            let SickListSeries = '' //Text
            let SickListPeriodFrom = ''//DateTime
            let SickListPeriodTo = ''//DateTime
            
            if (this.props.fieldValue["SickListType"] !== undefined) {
              SickListType = "Вид: " + this.props.fieldValue["SickListType"] + ", "
            }
            if (this.props.fieldValue["SickListSeries"] !== undefined) {
              SickListSeries = "Серия: " + this.props.fieldValue["SickListSeries"] + ", "
            }
            if (this.props.fieldValue["SickListPeriodFrom"] !== undefined) {
              SickListPeriodFrom = "Период с: " + this.parseDate(this.props.fieldValue["SickListPeriodFrom"]) + ", "
            }
            if (this.props.fieldValue["SickListPeriodTo"] !== undefined) {
              SickListPeriodTo = "Период по: " + this.parseDate(this.props.fieldValue["SickListPeriodTo"]) + ", "
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {SickListType + SickListSeries + SickListPeriodFrom + SickListPeriodTo}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "ExamDates"){
            let ExamStartDate = '' //DateTime
            let ExamOfDate = ''//DateTime
            let ExamFinishDate = ''//DateTime
            
            if (this.props.fieldValue["ExamStartDate"] !== undefined) {
              ExamStartDate = "Начало: " + this.parseDate(this.props.fieldValue["ExamStartDate"]) + ", "
            }
            if (this.props.fieldValue["ExamOfDate"] !== undefined) {
              ExamOfDate = "Проведение: " + this.parseDate(this.props.fieldValue["ExamOfDate"]) + ", "
            }
            if (this.props.fieldValue["ExamFinishDate"] !== undefined) {
              ExamFinishDate = "Окончание: " + this.parseDate(this.props.fieldValue["ExamFinishDate"]) + ", "
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {ExamStartDate + ExamOfDate + ExamFinishDate}
                  </td>
                </tr>
              </tbody>
            )
          }
        }
        else if(this.props.Form.formName === "ChildMedicalCertificateForm"){
          if(section.name === "detailedFormSection"){
            let No = ''
            let DateOfReg = ''
            if (this.props.fieldValue["No"] !== undefined) {
              No = "№ регистрации: " + this.props.fieldValue["No"] + ", "
            }
            if(this.props.fieldValue["Date"] !== undefined){
              DateOfReg = "Дата регистрации: " + this.parseDate(this.props.fieldValue["Date"])
            }
            return(
              <tbody>
                <tr>
                  <td data-b-a-s="thin" data-f-bold="true">{number}</td>
                  <th data-b-a-s="thin" data-f-bold="true" data-a-h="center">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin" ></td>
                  <td  data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {No + DateOfReg}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "PersonData"){
            let Last_Name = ''
            let First_Name = ''
            let Middle_Name = ''
            let Date_of_Birth = ''
            let PassportNo = ''
            let Issuing_Authority = ''
            let Date_of_Issue = ''  
            let Sex = ''
            for(let i=0; i < this.props.person.attributes.length; i++){
              if(this.props.person.attributes[i].name === "Last_Name"){
                Last_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "First_Name"){
                First_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Middle_Name"){
                Middle_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Birth"){
                Date_of_Birth = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "PassportNo"){
                PassportNo = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Issuing_Authority"){
                Issuing_Authority = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Issue"){
                Date_of_Issue = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "Sex"){
                Sex = this.props.person.attributes[i].enumValueText
              }
            }  
            return(
              <tbody>
                <tr>
                  <td data-b-a-s="thin" data-f-bold="true">{number}</td>
                  <th data-b-a-s="thin" data-f-bold="true">Заявитель</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">ФИО</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {Last_Name + " " + First_Name + " " + Middle_Name }</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {"№ " + PassportNo + ", выдан: " + Date_of_Issue + " " + Issuing_Authority}
                  </td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Дата рождения/пол</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {Date_of_Birth + ", пол: " + Sex}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "personDetailFormSection"){
            let Country = ''
            let Region = ''
            let District = ''
            let subDistrict = ''
            let Village = ''
            let Phone = ''
            let ResidentialAddress = ''
            if (this.props.fieldValue["Country"] !== undefined) {
              
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  Country = this.props.SOAT.countries[i].name + ", "
                }
              }
            }
            if (this.props.fieldValue["Region"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      Region = this.props.SOAT.countries[i].regions[l].name + ", "
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["District"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          District = this.props.SOAT.countries[i].regions[l].districts[m].name + ", "
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["subDistrict"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts !== undefined){
                            for(let n=0; n < this.props.SOAT.countries[i].regions[l].districts[m].subDistricts.length; n++){
                              if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].code === this.props.fieldValue["subDistrict"]){
                                subDistrict = this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].name + ", "
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["Village"] !== undefined) {
              Village = this.props.fieldValue["Village"] + ", "
            }
            if (this.props.fieldValue["Phone"] !== undefined) {
              Phone = "Тел: " + this.props.fieldValue["Phone"] + ", "
            }
            if (this.props.fieldValue["ResidentialAddress"] !== undefined) {
              ResidentialAddress = "дом/кв/ул: " + this.props.fieldValue["ResidentialAddress"]
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">Адресные данные заявителя</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {Country + " " + Region + " " + District  + " " + subDistrict + " " + Village + " " + Phone + " " + ResidentialAddress}</td>
                </tr>
    
              </tbody>
            )
          }
          else if(section.name === "ParentsInfo"){
            let LastNameParents = ''
            let FirstNameParents = ''
            let MiddleNameParents = ''
            let GenderParents = ''
            let DateOfBirthParents = ''     
            if (this.props.fieldValue["LastNameParents"] !== undefined) {
              LastNameParents = this.props.fieldValue["LastNameParents"] + " "
            }
            if(this.props.fieldValue["FirstNameParents"] !== undefined){
              FirstNameParents = this.props.fieldValue["FirstNameParents"] + " "
            }
            if(this.props.fieldValue["MiddleNameParents"] !== undefined){
              MiddleNameParents = this.props.fieldValue["MiddleNameParents"] 
            }
            if(this.props.fieldValue["GenderParents"] !== undefined){
              GenderParents =  this.getEnumValueText("GenderParents") + ", "
            }
            if(this.props.fieldValue["DateOfBirthParents"] !== undefined){
              DateOfBirthParents = this.parseDate(this.props.fieldValue["DateOfBirthParents"])
            } 
            return(
              <tbody>
                <tr>
                  <th 
                  data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th 
                  data-b-a-s="thin" data-f-bold="true"
                 >{section.label}</th>
                </tr>
                <tr>
                  <th 
                  data-b-a-s="thin" data-f-bold="true"></th>
                  <th 
                  data-b-a-s="thin" data-f-bold="true"
                 >ФИО</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td 
                  data-b-a-s="thin" data-a-h="right" data-a-v="justify"	
                  
                  >
                    {LastNameParents + FirstNameParents + MiddleNameParents}
                  </td>
                </tr>
                <tr>
                  <th 
                  data-b-a-s="thin" data-f-bold="true"></th>
                  <th 
                  data-b-a-s="thin" data-f-bold="true"
                 >Пол/Дата рождения</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td 
                  data-b-a-s="thin" data-a-h="right" data-a-v="justify"	
                  
                  >
                    {GenderParents + DateOfBirthParents}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "presence"){
            let RegNoAct = ''
            let MedicalOrgName = ''
            let MedicalOrgAddress = ''
            let EducationAct = ''
            let ExaminationPrRe = ''
            let Examination4 = ''        
            if (this.props.fieldValue["RegNoAct"] !== undefined) {
              RegNoAct = "№ акта по МСЭК: " + this.props.fieldValue["RegNoAct"] + ", "
            }
            if(this.props.fieldValue["MedicalOrgName"] !== undefined){
              MedicalOrgName = "Наименование лечебной организации направившей на МСЭК: " + this.props.fieldValue["MedicalOrgName"] + ", "
            }
            if(this.props.fieldValue["MedicalOrgAddress"] !== undefined){
              MedicalOrgAddress = "Адрес направившей лечебной организации: " + this.props.fieldValue["MedicalOrgAddress"] + ", "
            }
            if(this.props.fieldValue["EducationAct"] !== undefined){
              EducationAct = "Образование: " + this.getEnumValueText("EducationAct") + ", " //this.props.fieldValue["EducationAct"] 
            }
            if(this.props.fieldValue["ExaminationPrRe"] !== undefined){
              ExaminationPrRe = "Тип освидетельствование: " +  this.getEnumValueText("ExaminationPrRe") + ", "
            }
            if(this.props.fieldValue["Examination4"] !== undefined){
              Examination4 = "Место освидетельствования: " + this.getEnumValueText("Examination4")
            } 
            return(
              <tbody>
                <tr>
                  <th 
                  data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th 
                  data-b-a-s="thin" data-f-bold="true"
                 >{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td 
                  data-b-a-s="thin" data-a-h="right" data-a-v="justify"	
                  
                  >
                    {RegNoAct + MedicalOrgName + MedicalOrgAddress + EducationAct + ExaminationPrRe + Examination4}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "goalSurvey"){
            let goal1 = ''
            let goal2 = ''
            let goal3 = ''
            let goal4 = ''
            let goal5 = ''
            let goal6 = ''
            let goal7 = ''
            let goal8 = ''
            let goal9 = ''
            let goalAnother = ''        
            if (this.props.fieldValue["goal1"] === true || this.props.fieldValue["goal1"] ==="True") {
              goal1 = "Для установления группы инвалидности, "
            }
            if(this.props.fieldValue["goal2"] === true || this.props.fieldValue["goal2"] ==="True"){
              goal2 = "Изменение причины инвалидности, "
            }
            if(this.props.fieldValue["goal3"] === true || this.props.fieldValue["goal3"] ==="True"){
              goal3 = "Определение степени утраты трудоспособности в %, "
            }
            // if(this.props.fieldValue["goal4"] === true || this.props.fieldValue["goal4"] ==="True"){
            //   goal4 = "Дом интернат, "
            // }
            // if(this.props.fieldValue["goal5"] === true || this.props.fieldValue["goal5"] ==="True"){
            //   goal5 =  "Заключение на: кресло-коляски, "
            // }
            // if(this.props.fieldValue["goal6"] === true || this.props.fieldValue["goal6"] ==="True"){
            //   goal6 =  "По ухудшению, "
            // }
            // if(this.props.fieldValue["goal7"] === true || this.props.fieldValue["goal7"] ==="True"){
            //   goal7 =  "Нуждается в специализированных средствах помощи (коляски, слуховой аппарат, и т.д.), "
            // }
            // if(this.props.fieldValue["goal8"] === true || this.props.fieldValue["goal8"] ==="True"){
            //   goal8 =  "Нуждается в протезно-ортопедических средствах, помощи специализированных учреждений (санаторно-курортное лечение, интернаты, дома престарелых, и т.д.), "
            // }
            // if(this.props.fieldValue["goal9"] === true || this.props.fieldValue["goal9"] ==="True"){
            //   goal9 =  "Оформление/продление листков нетрудоспособности, и т.д.), "
            // }
            // if(this.props.fieldValue["goalAnother"] !== undefined){
            //   goalAnother = "Другое: " + this.props.fieldValue["goalAnother"]
            // }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {goal1 + goal2 + goal3 + goal4 + goal5 + goal6 + goal7 + goal8 + goal9 + goalAnother}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "additionalnformation"){
            let PlaceOfStudy = ''
            let PensionStatus = ''
            let PensionAmount = ''
            let Height = ''
            let Weight = ''      
            if(this.props.fieldValue["PlaceOfStudy"] !== undefined){
              PlaceOfStudy = "Место учебы: "  + this.props.fieldValue["PlaceOfStudy"] + ", "
            }
            if(this.props.fieldValue["PensionStatus"] !== undefined){
              PensionStatus = "Получает пенсию: "  + this.getEnumValueText("PensionStatus") + ", "
            }
            if(this.props.fieldValue["PensionAmount"] !== undefined){
              PensionAmount = "Размер пенсии: "  + this.props.fieldValue["PensionAmount"] + ", "
            }
            if(this.props.fieldValue["Height"] !== undefined){
              Height = "Рост: "  + this.props.fieldValue["Height"]
            }
            if(this.props.fieldValue["Weight"] !== undefined){
              Weight = "Вес: "  + this.props.fieldValue["Weight"]
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {PlaceOfStudy + PensionStatus + PensionAmount + Height + Weight}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Results"){
            let ExpertExamResult = ''
            let ExpertExamResult1 = ''
            let ExpertExamResult2 = ''
            let ExpertExamResult3 = ''
            let ExpertExamResult4 = ''
            let ExpertExamResult4Comment = ''
            let ExpertExamResult5 = ''
            let ExpertExamResult5Comment = ''
            let ExpertExamResult6 = ''
            let ExpertExamResult6Comment = ''
            let ExpertExamResult7 = ''
            let ExpertExamResult7Comment = ''
            let ExpertExamResult9 = ''
            let ExpertExamResult9Comment = ''
            let ExpertExamResult10 = ''
            let ExpertExamResult10Comment = ''
            let ExpertExamResult11 = ''
            let ExpertExamResult11Comment = ''
             let ExpertExamResult8 = '' //доктора др спец-й
            if (this.props.fieldValue["ExpertExamResult"] !== undefined) {
              ExpertExamResult = this.props.fieldValue["ExpertExamResult"]
            }
            if (this.props.fieldValue["ExpertExamResult1"] !== undefined) {
              ExpertExamResult1 =this.props.fieldValue["ExpertExamResult1"]
            }
            if (this.props.fieldValue["ExpertExamResult2"] !== undefined) {
              ExpertExamResult2 = this.props.fieldValue["ExpertExamResult2"]
            }
            if (this.props.fieldValue["ExpertExamResult3"] !== undefined) {
              ExpertExamResult3 = this.props.fieldValue["ExpertExamResult3"]
            }
            if (this.props.fieldValue["ExpertExamResult4"] !== undefined) {
              ExpertExamResult4 = this.props.fieldValue["ExpertExamResult4"]
            }
            if (this.props.fieldValue["ExpertExamResult4Comment"] !== undefined) {
              ExpertExamResult4Comment = this.props.fieldValue["ExpertExamResult4Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult5"] !== undefined) {
              ExpertExamResult5 = this.props.fieldValue["ExpertExamResult5"]
            }
            if (this.props.fieldValue["ExpertExamResult5Comment"] !== undefined) {
              ExpertExamResult5Comment = this.props.fieldValue["ExpertExamResult5Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult6"] !== undefined) {
              ExpertExamResult6 = this.props.fieldValue["ExpertExamResult6"]
            }
            if (this.props.fieldValue["ExpertExamResult6Comment"] !== undefined) {
              ExpertExamResult6Comment = this.props.fieldValue["ExpertExamResult6Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult7"] !== undefined) {
              ExpertExamResult7 = this.props.fieldValue["ExpertExamResult7"]
            }
            if (this.props.fieldValue["ExpertExamResult7Comment"] !== undefined) {
              ExpertExamResult7Comment = this.props.fieldValue["ExpertExamResult7Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult9"] !== undefined) {
              ExpertExamResult9 = this.props.fieldValue["ExpertExamResult9"]
            }
            if (this.props.fieldValue["ExpertExamResult9Comment"] !== undefined) {
              ExpertExamResult9Comment = this.props.fieldValue["ExpertExamResult9Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult10"] !== undefined) {
              ExpertExamResult10 = this.props.fieldValue["ExpertExamResult10"]
            }
            if (this.props.fieldValue["ExpertExamResult10Comment"] !== undefined) {
              ExpertExamResult10Comment = this.props.fieldValue["ExpertExamResult10Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult11"] !== undefined) {
              ExpertExamResult11 = this.props.fieldValue["ExpertExamResult11"]
            }
            if (this.props.fieldValue["ExpertExamResult11Comment"] !== undefined) {
              ExpertExamResult11Comment = this.props.fieldValue["ExpertExamResult11Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult8"] !== undefined) {
              ExpertExamResult8 = this.props.fieldValue["ExpertExamResult8"]
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Жалобы</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Клинико-трудовой анамнез</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult1}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные лабораторных и рентгенологических исследований</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult2}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Результаты доп. спец-х исследований</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult3}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные врача-терапевта</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult4}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult4Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные врача-хирурга</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult5}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult5Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные врача-офтальмолога</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult6}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult6Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные эксперта невропатолога и психиатра</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult7}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult7Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные эксперта окулиста</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult9}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult9Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные эксперта кардиолога</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult10}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult10Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные эксперта педиатра</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult11}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Комментарий</th>
                </tr><tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult11Comment}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные врачей других специальностей</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {ExpertExamResult8}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Diagnosis"){
            let Diagnosis = ''
            let MainDiagnosis = ''
            let CompanionDiagnosis = ''
            let DiseaseComplication = ''
            let CompainDagnosisMKB1 = ''
            let CompainDagnosisMKB2 = ''
            let CompainDagnosisMKB3 = ''
            
            if (this.props.fieldValue["Diagnosis"] !== undefined){
              Diagnosis = this.getEnumValueText("Diagnosis")
            }
            if (this.props.fieldValue["MainDiagnosis"] !== undefined){
              MainDiagnosis = this.props.fieldValue["MainDiagnosis"]
            }
            if (this.props.fieldValue["CompanionDiagnosis"] !== undefined){
              CompanionDiagnosis = this.props.fieldValue["CompanionDiagnosis"]
            }
            if (this.props.fieldValue["DiseaseComplication"] !== undefined){
              DiseaseComplication = this.props.fieldValue["DiseaseComplication"]
            }
            if (this.props.fieldValue["CompainDagnosisMKB1"] !== undefined){
              CompainDagnosisMKB1 = this.getEnumValueText("CompainDagnosisMKB1")
            }
            if (this.props.fieldValue["CompainDagnosisMKB2"] !== undefined){
              CompainDagnosisMKB2 = this.getEnumValueText("CompainDagnosisMKB2")
            }
            if (this.props.fieldValue["CompainDagnosisMKB3"] !== undefined){
              CompainDagnosisMKB3 = this.getEnumValueText("CompainDagnosisMKB3")
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Диагноз</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {Diagnosis}</td>
                </tr> 
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Основной</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {MainDiagnosis}</td>
                </tr> 
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Сопутствующий</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {CompanionDiagnosis}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Осложнение болезни</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {DiseaseComplication}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Соп. диагноз по МКБ 1</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {CompainDagnosisMKB1}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Соп. диагноз по МКБ 2</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {CompainDagnosisMKB2}</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Соп. диагноз по МКБ 3</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                 >
                    {CompainDagnosisMKB3}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "ExpertDecision"){
            let DisabilityGroup = '' //Enum
            let DisabilityReason = ''//Enum
            let NeedsSupervision = ''//Bool
            let NeedsCare = ''//Bool
            let RestorativeTherapy = ''//Bool
            let ReconstructiveSurgery = ''//Bool
            let HospitalTreatment = ''//Bool
            let Hospitalization = ''//Bool
            
            if (this.props.fieldValue["DisabilityGroup"] !== undefined) {
              DisabilityGroup = "Группа инвалидности: " + this.getEnumValueText("DisabilityGroup") + ", "
            }
            if (this.props.fieldValue["DisabilityReason"] !== undefined) {
              DisabilityReason = "Причина инвалидности: " + this.getEnumValueText("DisabilityReason") + ", "
            }
            if (this.props.fieldValue["NeedsSupervision"] === true || this.props.fieldValue["NeedsSupervision"] ==="True") {
              NeedsSupervision  = "Нуждается в надзоре, "
            }
            if (this.props.fieldValue["NeedsCare"] === true || this.props.fieldValue["NeedsCare"] ==="True") {
              NeedsCare  = "Нуждается в уходе, "
            }
            if (this.props.fieldValue["RestorativeTherapy"] === true || this.props.fieldValue["RestorativeTherapy"] ==="True") {
              RestorativeTherapy  = "Восстановительная терапия, "
            }
            if (this.props.fieldValue["ReconstructiveSurgery"] === true || this.props.fieldValue["ReconstructiveSurgery"] ==="True") {
              ReconstructiveSurgery  = "Реконструктивная  хирургия, "
            }
            if (this.props.fieldValue["HospitalTreatment"] === true || this.props.fieldValue["HospitalTreatment"] ==="True") {
              HospitalTreatment  = "Амбулаторное лечение, "
            }
            if (this.props.fieldValue["Hospitalization"] === true || this.props.fieldValue["Hospitalization"] ==="True") {
              Hospitalization  = "Стационарное лечение, "
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {DisabilityGroup + DisabilityReason + NeedsSupervision + NeedsCare + RestorativeTherapy + RestorativeTherapy + ReconstructiveSurgery + HospitalTreatment + Hospitalization}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "DisabilityPeriod"){
            let ExamDateFrom = '' //DateTime
            let ExamDateTo = ''//DateTime
            let Indefinitely = ''//Bool
            
            if (this.props.fieldValue["ExamDateFrom"] !== undefined) {
              ExamDateFrom = "Инвалидность установлена с: " + this.parseDate(this.props.fieldValue["ExamDateFrom"]) + ", "
            }
            if (this.props.fieldValue["ExamDateTo"] !== undefined) {
              ExamDateTo = "Инвалидность установлена по: " + this.parseDate(this.props.fieldValue["ExamDateTo"]) + ", "
            }
            if (this.props.fieldValue["Indefinitely"] === true || this.props.fieldValue["Indefinitely"] ==="True") {
              Indefinitely = "Бессрочно, " 
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {ExamDateFrom + ExamDateTo + Indefinitely}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "SickLists"){
            let SickListType = '' //Text
            let SickListSeries = '' //Text
            let SickListPeriodFrom = ''//DateTime
            let SickListPeriodTo = ''//DateTime
            
            if (this.props.fieldValue["SickListType"] !== undefined) {
              SickListType = "Вид: " + this.props.fieldValue["SickListType"] + ", "
            }
            if (this.props.fieldValue["SickListSeries"] !== undefined) {
              SickListSeries = "Серия: " + this.props.fieldValue["SickListSeries"] + ", "
            }
            if (this.props.fieldValue["SickListPeriodFrom"] !== undefined) {
              SickListPeriodFrom = "Период с: " + this.parseDate(this.props.fieldValue["SickListPeriodFrom"]) + ", "
            }
            if (this.props.fieldValue["SickListPeriodTo"] !== undefined) {
              SickListPeriodTo = "Период по: " + this.parseDate(this.props.fieldValue["SickListPeriodTo"]) + ", "
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {SickListType + SickListSeries + SickListPeriodFrom + SickListPeriodTo}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "ExamDates"){
            let ExamStartDate = '' //DateTime
            let ExamOfDate = ''//DateTime
            let ExamFinishDate = ''//DateTime
            
            if (this.props.fieldValue["ExamStartDate"] !== undefined) {
              ExamStartDate = "Начало: " + this.parseDate(this.props.fieldValue["ExamStartDate"]) + ", "
            }
            if (this.props.fieldValue["ExamOfDate"] !== undefined) {
              ExamOfDate = "Проведение: " + this.parseDate(this.props.fieldValue["ExamOfDate"]) + ", "
            }
            if (this.props.fieldValue["ExamFinishDate"] !== undefined) {
              ExamFinishDate = "Окончание: " + this.parseDate(this.props.fieldValue["ExamFinishDate"]) + ", "
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {ExamStartDate + ExamOfDate + ExamFinishDate}
                  </td>
                </tr>
              </tbody>
            )
          }
        }
        else if(this.props.Form.formName === "ChildIPRForm" || this.props.Form.formName === "AdultsIPRForm"){
          if(section.name === "IPRSection"){
            let IPRNo = '' // Text
            let DisabilityGroup = '' // Enum
            let DisabilityReason = '' // Enum
            let ClinicalMedicalExam = '' // Text
            if (this.props.fieldValue["IPRNo"] !== undefined) {
              IPRNo = "№ ИПР: " + this.props.fieldValue["IPRNo"] + ", "
            }
            if(this.props.fieldValue["DisabilityGroup"] !== undefined){
              DisabilityGroup =  "Группа инвалидности: " + this.getEnumValueText("DisabilityGroup") + ", "
            }
            if(this.props.fieldValue["DisabilityReason"] !== undefined){
              DisabilityReason = "Причина инвалидности: " +  this.getEnumValueText("DisabilityReason")
            }
            if(this.props.fieldValue["ClinicalMedicalExam"] !== undefined){
              ClinicalMedicalExam = this.props.fieldValue["ClinicalMedicalExam"] 
            }
            return(
              <tbody>
                <tr>
                  <th 
                  data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true" data-a-h="center">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {IPRNo + DisabilityGroup + DisabilityReason}
                  </td>
                </tr>
                <tr>
                  <th 
                  data-b-a-s="thin" data-f-bold="true"></th>
                  <th data-b-a-s="thin" data-f-bold="true">Клинический медицинский осмотр</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {ClinicalMedicalExam}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "PersonData"){
            let Last_Name = ''
            let First_Name = ''
            let Middle_Name = ''
            let Date_of_Birth = ''
            let PassportNo = ''
            let Issuing_Authority = ''
            let Date_of_Issue = ''
            let Sex = ''
            for(let i=0; i < this.props.person.attributes.length; i++){
              if(this.props.person.attributes[i].name === "Last_Name"){
                Last_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "First_Name"){
                First_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Middle_Name"){
                Middle_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Birth"){
                Date_of_Birth = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "PassportNo"){
                PassportNo = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Issuing_Authority"){
                Issuing_Authority = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Issue"){
                Date_of_Issue = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "Sex"){
                Sex = this.props.person.attributes[i].enumValueText
              }
            }  
            return(
              <tbody>
                <tr>
                  <td data-b-a-s="thin" data-f-bold="true">{number}</td>
                  <th data-b-a-s="thin" data-f-bold="true">Заявитель</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">ФИО</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {Last_Name + " " + First_Name + " " + Middle_Name }</td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Данные</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {"№ " + PassportNo + ", выдан: " + Date_of_Issue + " " + Issuing_Authority}
                  </td>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <th data-b-a-s="thin" data-f-bold="true">Дата рождения/пол</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {Date_of_Birth + ", пол: " + Sex}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "personDetailFormSection"){
            let Country = ''
            let Region = ''
            let District = ''
            let subDistrict = ''
            let Village = ''
            let Phone = ''
            let ResidentialAddress = ''
            if (this.props.fieldValue["Country"] !== undefined) {
              
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  Country = this.props.SOAT.countries[i].name + ", "
                }
              }
            }
            if (this.props.fieldValue["Region"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      Region = this.props.SOAT.countries[i].regions[l].name + ", "
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["District"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          District = this.props.SOAT.countries[i].regions[l].districts[m].name + ", "
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["subDistrict"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts !== undefined){
                            for(let n=0; n < this.props.SOAT.countries[i].regions[l].districts[m].subDistricts.length; n++){
                              if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].code === this.props.fieldValue["subDistrict"]){
                                subDistrict = this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].name + ", "
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["Village"] !== undefined) {
              Village = this.props.fieldValue["Village"] + ", "
            }
            if (this.props.fieldValue["Phone"] !== undefined) {
              Phone = "Тел: " + this.props.fieldValue["Phone"] + ", "
            }
            if (this.props.fieldValue["ResidentialAddress"] !== undefined) {
              ResidentialAddress = "дом/кв/ул: " + this.props.fieldValue["ResidentialAddress"]
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">Адресные данные заявителя</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify" 
                  >
                    {Country + " " + Region + " " + District  + " " + subDistrict + " " + Village + " " + Phone + " " + ResidentialAddress}</td>
                </tr>
    
              </tbody>
            )
          }
          else if(section.name === "MedicalRehabilitation"){
            let RehabTherapyMed = '' // Bool
            let ReconstructiveurgeryMed = '' // Bool
            let SpaResortTreatmentMed = '' // Bool
            let OtherRehabMed = '' // Text
            let ExpertAdviceMed = '' // Text   
            let MedPerformed = '' // Bool  
            let ExecutionIPRDateMed = '' // DateTime 
            let PlaceExecutionMed = '' // Text 
            let MedNotPerformed = '' // Bool 
            let NotPerformedMed = '' // Text 
            if (this.props.fieldValue["RehabTherapyMed"] === true || this.props.fieldValue["RehabTherapyMed"] ==="True") {
              RehabTherapyMed = "Восстановительная терапия, "
            }
            if(this.props.fieldValue["ReconstructiveurgeryMed"] === true || this.props.fieldValue["ReconstructiveurgeryMed"] ==="True"){
              ReconstructiveurgeryMed = "Реконструктивная хирургия, "
            }
            if(this.props.fieldValue["SpaResortTreatmentMed"] === true || this.props.fieldValue["SpaResortTreatmentMed"] ==="True"){
              SpaResortTreatmentMed = "Санаторно-курортное лечение, "
            }
            if(this.props.fieldValue["OtherRehabMed"] !== undefined){
              OtherRehabMed = "Другое: " + this.props.fieldValue["OtherRehabMed"]
            }
            if(this.props.fieldValue["ExpertAdviceMed"] !== undefined){
              ExpertAdviceMed = this.props.fieldValue["ExpertAdviceMed"]
            }
            if(this.props.fieldValue["MedPerformed"] === true || this.props.fieldValue["MedPerformed"] ==="True"){
              MedPerformed = "Выполнено, "
            }
            if(this.props.fieldValue["ExecutionIPRDateMed"] !== undefined){
              ExecutionIPRDateMed = "Дата выполнения: " + this.parseDate(this.props.fieldValue["ExecutionIPRDateMed"])
            }
            if(this.props.fieldValue["PlaceExecutionMed"] !== undefined){
              PlaceExecutionMed = "Место выполнения: " + this.props.fieldValue["PlaceExecutionMed"]
            }
            if(this.props.fieldValue["MedNotPerformed"] === true || this.props.fieldValue["MedNotPerformed"] ==="True"){
              MedNotPerformed = "Не выполнено, "
            }
            if(this.props.fieldValue["NotPerformedMed"] !== undefined){
              NotPerformedMed = "Причина: " + this.props.fieldValue["NotPerformedMed"]
            }
            
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {RehabTherapyMed + ReconstructiveurgeryMed + SpaResortTreatmentMed + OtherRehabMed}
                  </td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true"></th>
                  <th data-b-a-s="thin" data-f-bold="true">Рекомендации специалистов ГС МСЭК</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">{ExpertAdviceMed}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true"></th>
                  <th data-b-a-s="thin" data-f-bold="true">Выполнение</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {MedPerformed + ExecutionIPRDateMed + PlaceExecutionMed + MedNotPerformed + NotPerformedMed}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "SocialRehabilitation"){
            let RehabTherapySoc = '' // Bool
            let ReconstructiveurgerySoc = '' // Bool
            let SpecialMobilEquipmentSoc = '' // Bool
            let SpaTreatmentSoc = '' // Bool
            let SpaResortTreatmentSoc = '' // Bool 
            let OtherRehabSoc = '' // Text  
            let ExpertAdviceSoc = '' // Text  
            let SocPerformed = '' // Bool 
            let ExecutionIPRDateSoc = '' // DateTime 
            let PlaceExecutionSoc = '' // Text 
            let SocNotPerformed = '' // Bool 
            let NotPerformedSoc = '' // Text 
            if (this.props.fieldValue["RehabTherapySoc"] === true || this.props.fieldValue["RehabTherapySoc"] ==="True") {
              RehabTherapySoc = "Предоставить протезно-ортопедические услуги, "
            }
            if(this.props.fieldValue["ReconstructiveurgerySoc"] === true || this.props.fieldValue["ReconstructiveurgerySoc"] ==="True"){
              ReconstructiveurgerySoc = "Обеспечить вспомогательными оборудованиями, "
            }
            if(this.props.fieldValue["SpecialMobilEquipmentSoc"] === true || this.props.fieldValue["SpecialMobilEquipmentSoc"] ==="True"){
              SpecialMobilEquipmentSoc = "Обеспечение специальными оборудованиями передвижения, "
            }
            if(this.props.fieldValue["SpaTreatmentSoc"] === true || this.props.fieldValue["SpaTreatmentSoc"] ==="True"){
              SpaTreatmentSoc = "Санаторно-курортное лечение, "
            }
            if(this.props.fieldValue["SpaResortTreatmentSoc"] === true || this.props.fieldValue["SpaResortTreatmentSoc"] ==="True"){
              SpaResortTreatmentSoc = "Социальные услуги, "
            }
            if(this.props.fieldValue["OtherRehabSoc"] !== undefined){
              OtherRehabSoc = "Другое: " + this.props.fieldValue["OtherRehabSoc"]
            }
            if(this.props.fieldValue["ExpertAdviceSoc"] !== undefined){
              ExpertAdviceSoc = this.props.fieldValue["ExpertAdviceSoc"]
            }
            if(this.props.fieldValue["SocPerformed"] === true || this.props.fieldValue["SocPerformed"] ==="True"){
              SocPerformed = "Выполнено, "
            }
            if(this.props.fieldValue["ExecutionIPRDateSoc"] !== undefined){
              ExecutionIPRDateSoc = "Дата выполнения: " + this.parseDate(this.props.fieldValue["ExecutionIPRDateSoc"])
            }
            if(this.props.fieldValue["PlaceExecutionSoc"] !== undefined){
              PlaceExecutionSoc = "Место выполнения: " + this.props.fieldValue["PlaceExecutionSoc"]
            }
            if(this.props.fieldValue["SocNotPerformed"] === true || this.props.fieldValue["SocNotPerformed"] ==="True"){
              SocNotPerformed = "Не выполнено, "
            }
            if(this.props.fieldValue["NotPerformedSoc"] !== undefined){
              NotPerformedSoc = "Причина: " + this.props.fieldValue["NotPerformedSoc"]
            }
            
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {RehabTherapySoc + ReconstructiveurgerySoc + SpecialMobilEquipmentSoc + SpaTreatmentSoc + SpaResortTreatmentSoc + OtherRehabSoc}
                  </td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true"></th>
                  <th data-b-a-s="thin" data-f-bold="true">Рекомендации специалистов ГС МСЭК</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">{ExpertAdviceSoc}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true"></th>
                  <th data-b-a-s="thin" data-f-bold="true">Выполнение</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {SocPerformed + ExecutionIPRDateSoc + PlaceExecutionSoc + SocNotPerformed + NotPerformedSoc}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "ProfRehabilitation"){
            let RehabTherapyProf = '' // Bool
            let ReconstructiveurgeryProf = '' // Bool
            let SpaResortTreatmentProf = '' // Bool
            let ScheduleBrieflyProf = '' // Text  
            let OtherRehabProf = '' // Text  
            let ExpertAdviceProf = '' // Text  
            let ProfPerformed = '' // Bool 
            let ExecutionIPRDateProf = '' // DateTime 
            let PlaceExecutionProf = '' // Text 
            let ProfNotPerformed = '' // Bool 
            let NotPerformedProf = '' // Text 
            if (this.props.fieldValue["RehabTherapyProf"] === true || this.props.fieldValue["RehabTherapyProf"] ==="True") {
              RehabTherapyProf = "Предоставление специалиста по сурдо переводу, "
            }
            if(this.props.fieldValue["ReconstructiveurgeryProf"] === true || this.props.fieldValue["ReconstructiveurgeryProf"] ==="True"){
              ReconstructiveurgeryProf = "Мероприятие по-психологически педагогический мероприятие, "
            }
            if(this.props.fieldValue["SpaResortTreatmentProf"] === true || this.props.fieldValue["SpaResortTreatmentProf"] ==="True"){
              SpaResortTreatmentProf = "Обеспечение работой через ведомство по труду и занятости населения, "
            }
            if(this.props.fieldValue["ScheduleBrieflyProf"] !== undefined){
              ScheduleBrieflyProf = "Составить график (кратко): " + this.props.fieldValue["ScheduleBrieflyProf"]
            }
            if(this.props.fieldValue["OtherRehabProf"] !== undefined){
              OtherRehabProf = "Другое: " + this.props.fieldValue["OtherRehabProf"]
            }
            if(this.props.fieldValue["ExpertAdviceProf"] !== undefined){
              ExpertAdviceProf = this.props.fieldValue["ExpertAdviceProf"]
            }
            if(this.props.fieldValue["ProfPerformed"] === true || this.props.fieldValue["ProfPerformed"] ==="True"){
              ProfPerformed = "Выполнено, "
            }
            if(this.props.fieldValue["ExecutionIPRDateProf"] !== undefined){
              ExecutionIPRDateProf = "Дата выполнения: " + this.parseDate(this.props.fieldValue["ExecutionIPRDateProf"])
            }
            if(this.props.fieldValue["PlaceExecutionProf"] !== undefined){
              PlaceExecutionProf = "Место выполнения: " + this.props.fieldValue["PlaceExecutionProf"]
            }
            if(this.props.fieldValue["ProfNotPerformed"] === true || this.props.fieldValue["ProfNotPerformed"] ==="True"){
              ProfNotPerformed = "Не выполнено, "
            }
            if(this.props.fieldValue["NotPerformedProf"] !== undefined){
              NotPerformedProf = "Причина: " + this.props.fieldValue["NotPerformedProf"]
            }
            
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {RehabTherapyProf + ReconstructiveurgeryProf + SpaResortTreatmentProf + OtherRehabProf + ScheduleBrieflyProf}
                  </td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true"></th>
                  <th data-b-a-s="thin" data-f-bold="true">Рекомендации специалистов ГС МСЭК</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">{ExpertAdviceProf}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true"></th>
                  <th data-b-a-s="thin" data-f-bold="true">Выполнение</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {ProfPerformed + ExecutionIPRDateProf + PlaceExecutionProf + ProfNotPerformed + NotPerformedProf}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Decisions"){
            let Opinions = ''     
            if (this.props.fieldValue["Opinions"] !== undefined) {
              Opinions = this.props.fieldValue["Opinions"] + ", "
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">{Opinions}</td>
                </tr>
              </tbody>
            )
          }
        }
        
      }
      else if(this.props.downloadType === "downloadPDF"){
        if(this.props.Form.formName === "AdultsMedicalCertificateForm"){
          if(section.name === "detailedFormSection"){
            let No = ''
            let DateOfReg = ''
            if (this.props.fieldValue["No"] !== undefined) {
              No = "№ регистрации: " + this.props.fieldValue["No"] + ", "
            }
            if(this.props.fieldValue["Date"] !== undefined){
              DateOfReg = "Дата регистрации: " + this.parseDate(this.props.fieldValue["Date"])
            }
            return(
              <tbody>
                <tr>
                  <td style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}>{number}</td>
                  <th style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}>{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} align="right">
                    {No + DateOfReg}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "PersonData"){
            let Last_Name = ''
            let First_Name = ''
            let Middle_Name = ''
            let Date_of_Birth = ''
            let PassportNo = ''
            let Issuing_Authority = ''
            let Date_of_Issue = ''  
            let Sex = ''
            for(let i=0; i < this.props.person.attributes.length; i++){
              if(this.props.person.attributes[i].name === "Last_Name"){
                Last_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "First_Name"){
                First_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Middle_Name"){
                Middle_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Birth"){
                Date_of_Birth = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "PassportNo"){
                PassportNo = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Issuing_Authority"){
                Issuing_Authority = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Issue"){
                Date_of_Issue = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "Sex"){
                Sex = this.props.person.attributes[i].enumValueText
              }
            }  
            return(
              <tbody>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Заявитель</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">ФИО</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Last_Name + " " + First_Name + " " + Middle_Name }</td>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {"№ " + PassportNo + ", выдан: " + Date_of_Issue + " " + Issuing_Authority}
                  </td>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Дата рождения/пол</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Date_of_Birth + ", пол: " + Sex}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "personDetailFormSection"){
            let Country = ''
            let Region = ''
            let District = ''
            let subDistrict = ''
            let Village = ''
            let Phone = ''
            let ResidentialAddress = ''
            if (this.props.fieldValue["Country"] !== undefined) {
              
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  Country = this.props.SOAT.countries[i].name + ", "
                }
              }
            }
            if (this.props.fieldValue["Region"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      Region = this.props.SOAT.countries[i].regions[l].name + ", "
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["District"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          District = this.props.SOAT.countries[i].regions[l].districts[m].name + ", "
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["subDistrict"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts !== undefined){
                            for(let n=0; n < this.props.SOAT.countries[i].regions[l].districts[m].subDistricts.length; n++){
                              if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].code === this.props.fieldValue["subDistrict"]){
                                subDistrict = this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].name + ", "
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["Village"] !== undefined) {
              Village = this.props.fieldValue["Village"] + ", "
            }
            if (this.props.fieldValue["Phone"] !== undefined) {
              Phone = "Тел: " + this.props.fieldValue["Phone"] + ", "
            }
            if (this.props.fieldValue["ResidentialAddress"] !== undefined) {
              ResidentialAddress = "дом/кв/ул: " + this.props.fieldValue["ResidentialAddress"]
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Адресные данные заявителя</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Country + " " + Region + " " + District  + " " + subDistrict + " " + Village + " " + Phone + " " + ResidentialAddress}</td>
                </tr>
    
              </tbody>
            )
          }
          else if(section.name === "presence"){
            let RegNoAct = ''
            let MedicalOrgName = ''
            let MedicalOrgAddress = ''
            let EducationAct = ''
            let Occupation = ''
            let ExaminationPrRe = ''
            let ExaminationPlace = ''        
            if (this.props.fieldValue["RegNoAct"] !== undefined) {
              RegNoAct = "№ акта по МСЭК: " + this.props.fieldValue["RegNoAct"] + ", "
            }
            if(this.props.fieldValue["MedicalOrgName"] !== undefined){
              MedicalOrgName = "Наименование лечебной организации направившей на МСЭК: " + this.props.fieldValue["MedicalOrgName"] + ", "
            }
            if(this.props.fieldValue["MedicalOrgAddress"] !== undefined){
              MedicalOrgAddress = "Адрес направившей лечебной организации: " + this.props.fieldValue["MedicalOrgAddress"] + ", "
            }
            if(this.props.fieldValue["EducationAct"] !== undefined){
              EducationAct = "Образование: " + this.getEnumValueText("EducationAct") + ", " //this.props.fieldValue["EducationAct"] 
            }
            if(this.props.fieldValue["Occupation"] !== undefined){
              Occupation =  "Род деятельности: " + this.getEnumValueText("Occupation") + ", "
            }
            if(this.props.fieldValue["ExaminationPrRe"] !== undefined){
              ExaminationPrRe = "Освидетельствование: " +  this.getEnumValueText("ExaminationPrRe") + ", "
            }
            if(this.props.fieldValue["ExaminationPlace"] !== undefined){
              ExaminationPlace = "Место освидетельствования: " + this.getEnumValueText("ExaminationPlace")
            } 
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right"
                  >
                    {RegNoAct + MedicalOrgName + MedicalOrgAddress + EducationAct + Occupation + ExaminationPrRe + ExaminationPlace}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "goalSurvey"){
            let goal1 = ''
            let goal2 = ''
            let goal3 = ''
            let goal4 = ''
            let goal5 = ''
            let goal6 = ''
            let goal7 = ''
            let goal8 = ''
            let goal9 = ''
            let goalAnother = ''        
            if (this.props.fieldValue["goal1"] === true || this.props.fieldValue["goal1"] ==="True") {
              goal1 = "Для установления группы инвалидности, "
            }
            if(this.props.fieldValue["goal2"] === true || this.props.fieldValue["goal2"] ==="True"){
              goal2 = "Изменение причины инвалидности, "
            }
            if(this.props.fieldValue["goal3"] === true || this.props.fieldValue["goal3"] ==="True"){
              goal3 = "Определение степени утраты трудоспособности в %, "
            }
            // if(this.props.fieldValue["goal4"] === true || this.props.fieldValue["goal4"] ==="True"){
            //   goal4 = "Дом интернат, "
            // }
            // if(this.props.fieldValue["goal5"] === true || this.props.fieldValue["goal5"] ==="True"){
            //   goal5 =  "Заключение на: кресло-коляски, "
            // }
            // if(this.props.fieldValue["goal6"] === true || this.props.fieldValue["goal6"] ==="True"){
            //   goal6 =  "По ухудшению, "
            // }
            // if(this.props.fieldValue["goal7"] === true || this.props.fieldValue["goal7"] ==="True"){
            //   goal7 =  "Нуждается в специализированных средствах помощи (коляски, слуховой аппарат, и т.д.), "
            // }
            // if(this.props.fieldValue["goal8"] === true || this.props.fieldValue["goal8"] ==="True"){
            //   goal8 =  "Нуждается в протезно-ортопедических средствах, помощи специализированных учреждений (санаторно-курортное лечение, интернаты, дома престарелых, и т.д.), "
            // }
            // if(this.props.fieldValue["goal9"] === true || this.props.fieldValue["goal9"] ==="True"){
            //   goal9 =  "Оформление/продление листков нетрудоспособности, и т.д.), "
            // }
            // if(this.props.fieldValue["goalAnother"] !== undefined){
            //   goalAnother = "Другое: " + this.props.fieldValue["goalAnother"]
            // }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {goal1 + goal2 + goal3 + goal4 + goal5 + goal6 + goal7 + goal8 + goal9 + goalAnother}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "additionalnformation"){
            let PlaceOfWork = ''
            let Position = ''
            let Wage = ''
            let PensionStatus = ''
            let PensionAmount = ''
            let TimeWork = ''
            let Profession = '' 
            let Height = ''
            let Weight = ''
            if (this.props.fieldValue["PlaceOfWork"] !== undefined) {
              PlaceOfWork = "Место работы: "  + this.props.fieldValue["PlaceOfWork"] + ", "
            }
            if (this.props.fieldValue["Position"] !== undefined) {
              Position = "Должность: "  + this.props.fieldValue["Position"] + ", "
            }
            if (this.props.fieldValue["Wage"] !== undefined) {
              Wage = "Среднемесячный заработок в последний год: "  + this.props.fieldValue["Wage"] + ", "
            }
            if (this.props.fieldValue["PensionStatus"] !== undefined) {
              PensionStatus = "Получает пенсию: "  + this.getEnumValueText("PensionStatus") + ", "
            }
            if (this.props.fieldValue["PensionAmount"] !== undefined) {
              PensionAmount = "Размер пенсии: "  + this.props.fieldValue["PensionAmount"] + ", "
            }
            if (this.props.fieldValue["TimeWork"] !== undefined) {
              TimeWork = "Где и с какого времени работает: "  + this.props.fieldValue["TimeWork"] + ", "
            }
            if (this.props.fieldValue["Profession"] !== undefined) {
              Profession = "Основная профессия: "  + this.props.fieldValue["Profession"]
            }
            if(this.props.fieldValue["Height"] !== undefined){
              Height = "Рост: "  + this.props.fieldValue["Height"]
            }
            if(this.props.fieldValue["Weight"] !== undefined){
              Weight = "Вес: "  + this.props.fieldValue["Weight"]
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {PlaceOfWork + Position + Wage + PensionStatus + PensionAmount + TimeWork + Profession + Height + Weight}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "houseConditions"){
            let Good = ''
            let Satisfactory = ''
            let Unsatisfactory = ''
            let SeparateApartment = ''
            let OwnHouse = ''
            let Dormitory = ''
            let LivingAreaRemovable = ''  
            let NoOwnAccommodation = ''       
            let Additionally = '' 
            if (this.props.fieldValue["Good"] === true || this.props.fieldValue["Good"] ==="True") {
              Good = "хорошие, "
            }
            if(this.props.fieldValue["Satisfactory"] === true || this.props.fieldValue["Satisfactory"] ==="True"){
              Satisfactory = "удовлетворительные, "
            }
            if(this.props.fieldValue["Unsatisfactory"] === true || this.props.fieldValue["Unsatisfactory"] ==="True"){
              Unsatisfactory = "неудовлетворительные, "
            }
            if(this.props.fieldValue["SeparateApartment"] === true || this.props.fieldValue["SeparateApartment"] ==="True"){
              SeparateApartment = "отдельная квартира, "
            }
            if(this.props.fieldValue["OwnHouse"] === true || this.props.fieldValue["OwnHouse"] ==="True"){
              OwnHouse =  "собственный дом, "
            }
            if(this.props.fieldValue["Dormitory"] === true || this.props.fieldValue["Dormitory"] ==="True"){
              Dormitory =  "общежитие, "
            }
            if(this.props.fieldValue["LivingAreaRemovable"] === true || this.props.fieldValue["LivingAreaRemovable"] ==="True"){
              LivingAreaRemovable = "жилая площадь съемная, "
            }
            if(this.props.fieldValue["NoOwnAccommodation"] === true || this.props.fieldValue["NoOwnAccommodation"] ==="True"){
              NoOwnAccommodation = "нет собственного жилья, "
            }
            if(this.props.fieldValue["Additionally"] === true || this.props.fieldValue["Additionally"] ==="True"){
              Additionally = "другое"
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Good + Satisfactory + Unsatisfactory + SeparateApartment + OwnHouse + Dormitory + LivingAreaRemovable + NoOwnAccommodation + Additionally}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "HowToDoJob"){
            let Easily = ''
            let Difficulties = ''
            let CantManage = ''
            let FullTimeWork = ''
            let PartTime = ''
            let AnIncomWorkWeek = ''
            let AdditionalInterruptions = ''
            if (this.props.fieldValue["Easily"] === true || this.props.fieldValue["Easily"] ==="True") {
              Easily  = "Легко, "
            }
            if(this.props.fieldValue["Difficulties"] === true || this.props.fieldValue["Difficulties"] ==="True"){
              Difficulties = "С трудом, "
            }
            if(this.props.fieldValue["CantManage"] === true || this.props.fieldValue["CantManage"] ==="True"){
              CantManage = "Не справляется, "
            }
            if(this.props.fieldValue["FullTimeWork"] === true || this.props.fieldValue["FullTimeWork"] ==="True"){
              FullTimeWork = "Полный рабочий день, "
            }
            if(this.props.fieldValue["PartTime"] === true || this.props.fieldValue["PartTime"] ==="True"){
              PartTime =  "Неполным рабочим днем, "
            }
            if(this.props.fieldValue["AnIncomWorkWeek"] === true || this.props.fieldValue["AnIncomWorkWeek"] ==="True"){
              AnIncomWorkWeek =  "Неполной рабочей неделей, "
            }
            if(this.props.fieldValue["AdditionalInterruptions"] === true || this.props.fieldValue["AdditionalInterruptions"] ==="True"){
              AdditionalInterruptions = "Дополнительными перерывами, "
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Easily + Difficulties + CantManage + FullTimeWork + PartTime + AnIncomWorkWeek + AdditionalInterruptions}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "WorkingConditions"){
            let WorkingConditions1 = ''
            let WorkingConditions2 = ''
            let WorkingConditions3 = ''
            let WorkingConditions4 = ''
            let WorkingConditions5 = ''
            let WorkingConditions6 = ''
            let WorkingConditions7 = ''  
            if (this.props.fieldValue["WorkingConditions1"] === true || this.props.fieldValue["WorkingConditions1"] ==="True") {
              WorkingConditions1 = "Нервно-психическое напряжение, "
            }
            if (this.props.fieldValue["WorkingConditions2"] === true || this.props.fieldValue["WorkingConditions2"] ==="True") {
              WorkingConditions2 = "Предписанный темп работы, "
            }
            if (this.props.fieldValue["WorkingConditions3"] === true || this.props.fieldValue["WorkingConditions3"] ==="True") {
              WorkingConditions3 = "Рабочая поза, "
            }
            if (this.props.fieldValue["WorkingConditions4"] === true || this.props.fieldValue["WorkingConditions4"] ==="True") {
              WorkingConditions4 = "Сложность/напряженность, "
            }
            if (this.props.fieldValue["WorkingConditions5"] === true || this.props.fieldValue["WorkingConditions5"] ==="True") {
              WorkingConditions5 = "Физический труд, "
            }
            if (this.props.fieldValue["WorkingConditions6"] === true || this.props.fieldValue["WorkingConditions6"] ==="True") {
              WorkingConditions6 = "Умственный труд, "
            }
            if (this.props.fieldValue["WorkingConditions7"] === true || this.props.fieldValue["WorkingConditions7"] ==="True") {
              WorkingConditions7 = "Надомный труд, "
            }
            
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {WorkingConditions1 + WorkingConditions2 + WorkingConditions3 + WorkingConditions4 + WorkingConditions5 + WorkingConditions6 + WorkingConditions7}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Results"){
            let ExpertExamResult = ''
            let ExpertExamResult1 = ''
            let ExpertExamResult2 = ''
            let ExpertExamResult3 = ''
            let ExpertExamResult4 = ''
            let ExpertExamResult4Comment = ''
            let ExpertExamResult5 = ''
            let ExpertExamResult5Comment = ''
            let ExpertExamResult6 = ''
            let ExpertExamResult6Comment = ''
            let ExpertExamResult7 = ''
            let ExpertExamResult7Comment = ''
            let ExpertExamResult9 = ''
            let ExpertExamResult9Comment = ''
            let ExpertExamResult10 = ''
            let ExpertExamResult10Comment = ''
             let ExpertExamResult8 = '' //доктора др спец-й
            if (this.props.fieldValue["ExpertExamResult"] !== undefined) {
              ExpertExamResult = this.props.fieldValue["ExpertExamResult"]
            }
            if (this.props.fieldValue["ExpertExamResult1"] !== undefined) {
              ExpertExamResult1 =this.props.fieldValue["ExpertExamResult1"]
            }
            if (this.props.fieldValue["ExpertExamResult2"] !== undefined) {
              ExpertExamResult2 = this.props.fieldValue["ExpertExamResult2"]
            }
            if (this.props.fieldValue["ExpertExamResult3"] !== undefined) {
              ExpertExamResult3 = this.props.fieldValue["ExpertExamResult3"]
            }
            if (this.props.fieldValue["ExpertExamResult4"] !== undefined) {
              ExpertExamResult4 = this.props.fieldValue["ExpertExamResult4"]
            }
            if (this.props.fieldValue["ExpertExamResult4Comment"] !== undefined) {
              ExpertExamResult4Comment = this.props.fieldValue["ExpertExamResult4Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult5"] !== undefined) {
              ExpertExamResult5 = this.props.fieldValue["ExpertExamResult5"]
            }
            if (this.props.fieldValue["ExpertExamResult5Comment"] !== undefined) {
              ExpertExamResult5Comment = this.props.fieldValue["ExpertExamResult5Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult6"] !== undefined) {
              ExpertExamResult6 = this.props.fieldValue["ExpertExamResult6"]
            }
            if (this.props.fieldValue["ExpertExamResult6Comment"] !== undefined) {
              ExpertExamResult6Comment = this.props.fieldValue["ExpertExamResult6Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult7"] !== undefined) {
              ExpertExamResult7 = this.props.fieldValue["ExpertExamResult7"]
            }
            if (this.props.fieldValue["ExpertExamResult7Comment"] !== undefined) {
              ExpertExamResult7Comment = this.props.fieldValue["ExpertExamResult7Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult9"] !== undefined) {
              ExpertExamResult9 = this.props.fieldValue["ExpertExamResult9"]
            }
            if (this.props.fieldValue["ExpertExamResult9Comment"] !== undefined) {
              ExpertExamResult9Comment = this.props.fieldValue["ExpertExamResult9Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult10"] !== undefined) {
              ExpertExamResult10 = this.props.fieldValue["ExpertExamResult10"]
            }
            if (this.props.fieldValue["ExpertExamResult10Comment"] !== undefined) {
              ExpertExamResult10Comment = this.props.fieldValue["ExpertExamResult10Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult8"] !== undefined) {
              ExpertExamResult8 = this.props.fieldValue["ExpertExamResult8"]
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Жалобы</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Клинико-трудовой анамнез</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult1}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные лабораторных и рентгенологических исследований</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult2}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} align="left">Результаты доп. спец-х исследований</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} align="right">
                    {ExpertExamResult3}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные врача-терапевта</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult4}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult4Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} align="left">Данные врача-хирурга</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} align="right">
                    {ExpertExamResult5}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult5Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные врача-офтальмолога</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult6}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult6Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные эксперта невропатолога и психиатра</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult7}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult7Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные эксперта окулиста</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult9}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult9Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные эксперта кардиолога</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult10}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult10Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные врачей других специальностей</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult8}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Diagnosis"){
            let Diagnosis = ''
            let MainDiagnosis = ''
            let CompanionDiagnosis = ''
            let DiseaseComplication = ''
            let CompainDagnosisMKB1 = ''
            let CompainDagnosisMKB2 = ''
            let CompainDagnosisMKB3 = ''
            
            if (this.props.fieldValue["Diagnosis"] !== undefined){
              Diagnosis = this.getEnumValueText("Diagnosis")
            }
            if (this.props.fieldValue["MainDiagnosis"] !== undefined){
              MainDiagnosis = this.props.fieldValue["MainDiagnosis"]
            }
            if (this.props.fieldValue["CompanionDiagnosis"] !== undefined){
              CompanionDiagnosis = this.props.fieldValue["CompanionDiagnosis"]
            }
            if (this.props.fieldValue["DiseaseComplication"] !== undefined){
              DiseaseComplication = this.props.fieldValue["DiseaseComplication"]
            }
            if (this.props.fieldValue["CompainDagnosisMKB1"] !== undefined){
              CompainDagnosisMKB1 = this.getEnumValueText("CompainDagnosisMKB1")
            }
            if (this.props.fieldValue["CompainDagnosisMKB2"] !== undefined){
              CompainDagnosisMKB2 = this.getEnumValueText("CompainDagnosisMKB2")
            }
            if (this.props.fieldValue["CompainDagnosisMKB3"] !== undefined){
              CompainDagnosisMKB3 = this.getEnumValueText("CompainDagnosisMKB3")
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Диагноз</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Diagnosis}</td>
                </tr> 
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Основной</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {MainDiagnosis}</td>
                </tr> 
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Осложнение болезни</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {DiseaseComplication}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Соп. диагноз по МКБ 1</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {CompainDagnosisMKB1}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Соп. диагноз по МКБ 2</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {CompainDagnosisMKB2}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Соп. диагноз по МКБ 3</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {CompainDagnosisMKB3}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "ExpertDecision"){
            let DisabilityGroup = '' //Enum
            let DisabilityReason = ''//Enum
            let WorkingConditions = ''//Enum
            let NeedsSupervision = ''//Bool
            let NeedsCare = ''//Bool
            let RestorativeTherapy = ''//Bool
            let ReconstructiveSurgery = ''//Bool
            let HospitalTreatment = ''//Bool
            let Hospitalization = ''//Bool
            
            if (this.props.fieldValue["DisabilityGroup"] !== undefined) {
              DisabilityGroup = "Группа инвалидности: " + this.getEnumValueText("DisabilityGroup") + ", "
            }
            if (this.props.fieldValue["DisabilityReason"] !== undefined) {
              DisabilityReason = "Причина инвалидности: " + this.getEnumValueText("DisabilityReason") + ", "
            }
            if (this.props.fieldValue["WorkingConditions"] !== undefined) {
              WorkingConditions = "Показанные и противопоказанные условия труда: " + this.getEnumValueText("WorkingConditions")+ "/ "
            }
            if (this.props.fieldValue["NeedsSupervision"] === true || this.props.fieldValue["NeedsSupervision"] ==="True") {
              NeedsSupervision  = "Нуждается в надзоре, "
            }
            if (this.props.fieldValue["NeedsCare"] === true || this.props.fieldValue["NeedsCare"] ==="True") {
              NeedsCare  = "Нуждается в уходе, "
            }
            if (this.props.fieldValue["RestorativeTherapy"] === true || this.props.fieldValue["RestorativeTherapy"] ==="True") {
              RestorativeTherapy  = "Восстановительная терапия, "
            }
            if (this.props.fieldValue["ReconstructiveSurgery"] === true || this.props.fieldValue["ReconstructiveSurgery"] ==="True") {
              ReconstructiveSurgery  = "Реконструктивная  хирургия, "
            }
            if (this.props.fieldValue["HospitalTreatment"] === true || this.props.fieldValue["HospitalTreatment"] ==="True") {
              HospitalTreatment  = "Амбулаторное лечение, "
            }
            if (this.props.fieldValue["Hospitalization"] === true || this.props.fieldValue["Hospitalization"] ==="True") {
              Hospitalization  = "Стационарное лечение, "
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {DisabilityGroup + DisabilityReason + WorkingConditions + NeedsSupervision + NeedsCare + RestorativeTherapy + RestorativeTherapy + ReconstructiveSurgery + HospitalTreatment + Hospitalization}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "DisabilityPeriod"){
            let ExamDateFrom = '' //DateTime
            let ExamDateTo = ''//DateTime
            let Indefinitely = ''//Bool
            let ReferenceNumber = ''//Text
            
            if (this.props.fieldValue["ExamDateFrom"] !== undefined) {
              ExamDateFrom = "Инвалидность установлена с: " + this.parseDate(this.props.fieldValue["ExamDateFrom"]) + ", "
            }
            if (this.props.fieldValue["ExamDateTo"] !== undefined) {
              ExamDateTo = "Инвалидность установлена по: " + this.parseDate(this.props.fieldValue["ExamDateTo"]) + ", "
            }
            if (this.props.fieldValue["Indefinitely"] === true || this.props.fieldValue["Indefinitely"] ==="True") {
              Indefinitely = "Бессрочно, " 
            }
            if (this.props.fieldValue["ReferenceNumber"] !== undefined) {
              ReferenceNumber  = "№/Серия справки: " + this.props.fieldValue["ReferenceNumber"]
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExamDateFrom + ExamDateTo + Indefinitely + ReferenceNumber}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "SickLists"){
            let SickListType = '' //Text
            let SickListSeries = '' //Text
            let SickListPeriodFrom = ''//DateTime
            let SickListPeriodTo = ''//DateTime
            
            if (this.props.fieldValue["SickListType"] !== undefined) {
              SickListType = "Вид: " + this.props.fieldValue["SickListType"] + ", "
            }
            if (this.props.fieldValue["SickListSeries"] !== undefined) {
              SickListSeries = "Серия: " + this.props.fieldValue["SickListSeries"] + ", "
            }
            if (this.props.fieldValue["SickListPeriodFrom"] !== undefined) {
              SickListPeriodFrom = "Период с: " + this.parseDate(this.props.fieldValue["SickListPeriodFrom"]) + ", "
            }
            if (this.props.fieldValue["SickListPeriodTo"] !== undefined) {
              SickListPeriodTo = "Период по: " + this.parseDate(this.props.fieldValue["SickListPeriodTo"]) + ", "
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {SickListType + SickListSeries + SickListPeriodFrom + SickListPeriodTo}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "ExamDates"){
            let ExamStartDate = '' //DateTime
            let ExamOfDate = ''//DateTime
            let ExamFinishDate = ''//DateTime
            
            if (this.props.fieldValue["ExamStartDate"] !== undefined) {
              ExamStartDate = "Начало: " + this.parseDate(this.props.fieldValue["ExamStartDate"]) + ", "
            }
            if (this.props.fieldValue["ExamOfDate"] !== undefined) {
              ExamOfDate = "Проведение: " + this.parseDate(this.props.fieldValue["ExamOfDate"]) + ", "
            }
            if (this.props.fieldValue["ExamFinishDate"] !== undefined) {
              ExamFinishDate = "Окончание: " + this.parseDate(this.props.fieldValue["ExamFinishDate"]) + ", "
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td    
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExamStartDate + ExamOfDate + ExamFinishDate}
                  </td>
                </tr>
              </tbody>
            )
          }
        }
        else if(this.props.Form.formName === "ChildMedicalCertificateForm"){
          if(section.name === "detailedFormSection"){
            let No = ''
            let DateOfReg = ''
            if (this.props.fieldValue["No"] !== undefined) {
              No = "№ регистрации: " + this.props.fieldValue["No"] + ", "
            }
            if(this.props.fieldValue["Date"] !== undefined){
              DateOfReg = "Дата регистрации: " + this.parseDate(this.props.fieldValue["Date"])
            }
            return(
              <tbody>
                <tr>
                  <td style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}>{number}</td>
                  <th style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}>{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} align="right">
                    {No + DateOfReg}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "PersonData"){
            let Last_Name = ''
            let First_Name = ''
            let Middle_Name = ''
            let Date_of_Birth = ''
            let PassportNo = ''
            let Issuing_Authority = ''
            let Date_of_Issue = ''  
            let Sex = ''
            for(let i=0; i < this.props.person.attributes.length; i++){
              if(this.props.person.attributes[i].name === "Last_Name"){
                Last_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "First_Name"){
                First_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Middle_Name"){
                Middle_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Birth"){
                Date_of_Birth = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "PassportNo"){
                PassportNo = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Issuing_Authority"){
                Issuing_Authority = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Issue"){
                Date_of_Issue = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "Sex"){
                Sex = this.props.person.attributes[i].enumValueText
              }
            }  
            return(
              <tbody>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Заявитель</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">ФИО</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Last_Name + " " + First_Name + " " + Middle_Name }</td>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {"№ " + PassportNo + ", выдан: " + Date_of_Issue + " " + Issuing_Authority}
                  </td>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Дата рождения/пол</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Date_of_Birth + ", пол: " + Sex}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "personDetailFormSection"){
            let Country = ''
            let Region = ''
            let District = ''
            let subDistrict = ''
            let Village = ''
            let Phone = ''
            let ResidentialAddress = ''
            if (this.props.fieldValue["Country"] !== undefined) {
              
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  Country = this.props.SOAT.countries[i].name + ", "
                }
              }
            }
            if (this.props.fieldValue["Region"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      Region = this.props.SOAT.countries[i].regions[l].name + ", "
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["District"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          District = this.props.SOAT.countries[i].regions[l].districts[m].name + ", "
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["subDistrict"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts !== undefined){
                            for(let n=0; n < this.props.SOAT.countries[i].regions[l].districts[m].subDistricts.length; n++){
                              if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].code === this.props.fieldValue["subDistrict"]){
                                subDistrict = this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].name + ", "
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["Village"] !== undefined) {
              Village = this.props.fieldValue["Village"] + ", "
            }
            if (this.props.fieldValue["Phone"] !== undefined) {
              Phone = "Тел: " + this.props.fieldValue["Phone"] + ", "
            }
            if (this.props.fieldValue["ResidentialAddress"] !== undefined) {
              ResidentialAddress = "дом/кв/ул: " + this.props.fieldValue["ResidentialAddress"]
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Адресные данные заявителя</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Country + " " + Region + " " + District  + " " + subDistrict + " " + Village + " " + Phone + " " + ResidentialAddress}</td>
                </tr>
    
              </tbody>
            )
          }
          else if(section.name === "ParentsInfo"){
            let LastNameParents = ''
            let FirstNameParents = ''
            let MiddleNameParents = ''
            let GenderParents = ''
            let DateOfBirthParents = ''     
            if (this.props.fieldValue["LastNameParents"] !== undefined) {
              LastNameParents = this.props.fieldValue["LastNameParents"] + " "
            }
            if(this.props.fieldValue["FirstNameParents"] !== undefined){
              FirstNameParents = this.props.fieldValue["FirstNameParents"] + " "
            }
            if(this.props.fieldValue["MiddleNameParents"] !== undefined){
              MiddleNameParents = this.props.fieldValue["MiddleNameParents"] 
            }
            if(this.props.fieldValue["GenderParents"] !== undefined){
              GenderParents =  this.getEnumValueText("GenderParents") + ", "
            }
            if(this.props.fieldValue["DateOfBirthParents"] !== undefined){
              DateOfBirthParents = this.parseDate(this.props.fieldValue["DateOfBirthParents"])
            } 
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">ФИО</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right"
                  >
                    {LastNameParents + FirstNameParents + MiddleNameParents}
                  </td>
                </tr>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Пол/Дата рождения</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right"
                  >
                    {GenderParents + DateOfBirthParents}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "presence"){
            let RegNoAct = ''
            let MedicalOrgName = ''
            let MedicalOrgAddress = ''
            let EducationAct = ''
            let ExaminationPrRe = ''
            let Examination4 = ''        
            if (this.props.fieldValue["RegNoAct"] !== undefined) {
              RegNoAct = "№ акта по МСЭК: " + this.props.fieldValue["RegNoAct"] + ", "
            }
            if(this.props.fieldValue["MedicalOrgName"] !== undefined){
              MedicalOrgName = "Наименование лечебной организации направившей на МСЭК: " + this.props.fieldValue["MedicalOrgName"] + ", "
            }
            if(this.props.fieldValue["MedicalOrgAddress"] !== undefined){
              MedicalOrgAddress = "Адрес направившей лечебной организации: " + this.props.fieldValue["MedicalOrgAddress"] + ", "
            }
            if(this.props.fieldValue["EducationAct"] !== undefined){
              EducationAct = "Образование: " + this.getEnumValueText("EducationAct") + ", " //this.props.fieldValue["EducationAct"] 
            }
            if(this.props.fieldValue["ExaminationPrRe"] !== undefined){
              ExaminationPrRe = "Тип освидетельствование: " +  this.getEnumValueText("ExaminationPrRe") + ", "
            }
            if(this.props.fieldValue["Examination4"] !== undefined){
              Examination4 = "Место освидетельствования: " + this.getEnumValueText("Examination4")
            } 
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right"
                  >
                    {RegNoAct + MedicalOrgName + MedicalOrgAddress + EducationAct + ExaminationPrRe + Examination4}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "goalSurvey"){
            let goal1 = ''
            let goal2 = ''
            let goal3 = ''
            let goal4 = ''
            let goal5 = ''
            let goal6 = ''
            let goal7 = ''
            let goal8 = ''
            let goal9 = ''
            let goalAnother = ''        
            if (this.props.fieldValue["goal1"] === true || this.props.fieldValue["goal1"] ==="True") {
              goal1 = "Для установления группы инвалидности, "
            }
            if(this.props.fieldValue["goal2"] === true || this.props.fieldValue["goal2"] ==="True"){
              goal2 = "Изменение причины инвалидности, "
            }
            if(this.props.fieldValue["goal3"] === true || this.props.fieldValue["goal3"] ==="True"){
              goal3 = "Определение степени утраты трудоспособности в %, "
            }
            // if(this.props.fieldValue["goal4"] === true || this.props.fieldValue["goal4"] ==="True"){
            //   goal4 = "Дом интернат, "
            // }
            // if(this.props.fieldValue["goal5"] === true || this.props.fieldValue["goal5"] ==="True"){
            //   goal5 =  "Заключение на: кресло-коляски, "
            // }
            // if(this.props.fieldValue["goal6"] === true || this.props.fieldValue["goal6"] ==="True"){
            //   goal6 =  "По ухудшению, "
            // }
            // if(this.props.fieldValue["goal7"] === true || this.props.fieldValue["goal7"] ==="True"){
            //   goal7 =  "Нуждается в специализированных средствах помощи (коляски, слуховой аппарат, и т.д.), "
            // }
            // if(this.props.fieldValue["goal8"] === true || this.props.fieldValue["goal8"] ==="True"){
            //   goal8 =  "Нуждается в протезно-ортопедических средствах, помощи специализированных учреждений (санаторно-курортное лечение, интернаты, дома престарелых, и т.д.), "
            // }
            // if(this.props.fieldValue["goal9"] === true || this.props.fieldValue["goal9"] ==="True"){
            //   goal9 =  "Оформление/продление листков нетрудоспособности, и т.д.), "
            // }
            // if(this.props.fieldValue["goalAnother"] !== undefined){
            //   goalAnother = "Другое: " + this.props.fieldValue["goalAnother"]
            // }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {goal1 + goal2 + goal3 + goal4 + goal5 + goal6 + goal7 + goal8 + goal9 + goalAnother}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "additionalnformation"){
            let PlaceOfStudy = ''
            let PensionStatus = ''
            let PensionAmount = ''   
            let Height = ''
            let Weight = ''   
            if (this.props.fieldValue["PlaceOfStudy"] !== undefined) {
              PlaceOfStudy = "Место учебы: "  + this.props.fieldValue["PlaceOfStudy"] + ", "
            }
            if (this.props.fieldValue["PensionStatus"] !== undefined) {
              PensionStatus = "Получает пенсию: "  + this.getEnumValueText("PensionStatus") + ", "
            }
            if (this.props.fieldValue["PensionAmount"] !== undefined) {
              PensionAmount = "Размер пенсии: "  + this.props.fieldValue["PensionAmount"] + ", "
            }
            if(this.props.fieldValue["Height"] !== undefined){
              Height = "Рост: "  + this.props.fieldValue["Height"]
            }
            if(this.props.fieldValue["Weight"] !== undefined){
              Weight = "Вес: "  + this.props.fieldValue["Weight"]
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {PlaceOfStudy + PensionStatus + PensionAmount + Height + Weight}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Results"){
            let ExpertExamResult = ''
            let ExpertExamResult1 = ''
            let ExpertExamResult2 = ''
            let ExpertExamResult3 = ''
            let ExpertExamResult4 = ''
            let ExpertExamResult4Comment = ''
            let ExpertExamResult5 = ''
            let ExpertExamResult5Comment = ''
            let ExpertExamResult6 = ''
            let ExpertExamResult6Comment = ''
            let ExpertExamResult7 = ''
            let ExpertExamResult7Comment = ''
            let ExpertExamResult9 = ''
            let ExpertExamResult9Comment = ''
            let ExpertExamResult10 = ''
            let ExpertExamResult10Comment = ''
            let ExpertExamResult11 = ''
            let ExpertExamResult11Comment = ''
             let ExpertExamResult8 = '' //доктора др спец-й
            if (this.props.fieldValue["ExpertExamResult"] !== undefined) {
              ExpertExamResult = this.props.fieldValue["ExpertExamResult"]
            }
            if (this.props.fieldValue["ExpertExamResult1"] !== undefined) {
              ExpertExamResult1 =this.props.fieldValue["ExpertExamResult1"]
            }
            if (this.props.fieldValue["ExpertExamResult2"] !== undefined) {
              ExpertExamResult2 = this.props.fieldValue["ExpertExamResult2"]
            }
            if (this.props.fieldValue["ExpertExamResult3"] !== undefined) {
              ExpertExamResult3 = this.props.fieldValue["ExpertExamResult3"]
            }
            if (this.props.fieldValue["ExpertExamResult4"] !== undefined) {
              ExpertExamResult4 = this.props.fieldValue["ExpertExamResult4"]
            }
            if (this.props.fieldValue["ExpertExamResult4Comment"] !== undefined) {
              ExpertExamResult4Comment = this.props.fieldValue["ExpertExamResult4Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult5"] !== undefined) {
              ExpertExamResult5 = this.props.fieldValue["ExpertExamResult5"]
            }
            if (this.props.fieldValue["ExpertExamResult5Comment"] !== undefined) {
              ExpertExamResult5Comment = this.props.fieldValue["ExpertExamResult5Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult6"] !== undefined) {
              ExpertExamResult6 = this.props.fieldValue["ExpertExamResult6"]
            }
            if (this.props.fieldValue["ExpertExamResult6Comment"] !== undefined) {
              ExpertExamResult6Comment = this.props.fieldValue["ExpertExamResult6Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult7"] !== undefined) {
              ExpertExamResult7 = this.props.fieldValue["ExpertExamResult7"]
            }
            if (this.props.fieldValue["ExpertExamResult7Comment"] !== undefined) {
              ExpertExamResult7Comment = this.props.fieldValue["ExpertExamResult7Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult9"] !== undefined) {
              ExpertExamResult9 = this.props.fieldValue["ExpertExamResult9"]
            }
            if (this.props.fieldValue["ExpertExamResult9Comment"] !== undefined) {
              ExpertExamResult9Comment = this.props.fieldValue["ExpertExamResult9Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult10"] !== undefined) {
              ExpertExamResult10 = this.props.fieldValue["ExpertExamResult10"]
            }
            if (this.props.fieldValue["ExpertExamResult10Comment"] !== undefined) {
              ExpertExamResult10Comment = this.props.fieldValue["ExpertExamResult10Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult11"] !== undefined) {
              ExpertExamResult11 = this.props.fieldValue["ExpertExamResult11"]
            }
            if (this.props.fieldValue["ExpertExamResult11Comment"] !== undefined) {
              ExpertExamResult11Comment = this.props.fieldValue["ExpertExamResult11Comment"]
            }
            if (this.props.fieldValue["ExpertExamResult8"] !== undefined) {
              ExpertExamResult8 = this.props.fieldValue["ExpertExamResult8"]
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Жалобы</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Клинико-трудовой анамнез</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult1}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные лабораторных и рентгенологических исследований</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult2}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} align="left">Результаты доп. спец-х исследований</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} align="right">
                    {ExpertExamResult3}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные врача-терапевта</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult4}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult4Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} align="left">Данные врача-хирурга</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} align="right">
                    {ExpertExamResult5}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult5Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные врача-офтальмолога</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult6}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult6Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные эксперта невропатолога и психиатра</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult7}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult7Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные эксперта окулиста</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult9}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult9Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные эксперта кардиолога</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult10}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult10Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные эксперта педиатра</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult11}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Комментарий</th>
                </tr><tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult11Comment}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные врачей других специальностей</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExpertExamResult8}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Diagnosis"){
            let Diagnosis = ''
            let MainDiagnosis = ''
            let CompanionDiagnosis = ''
            let DiseaseComplication = ''
            let CompainDagnosisMKB1 = ''
            let CompainDagnosisMKB2 = ''
            let CompainDagnosisMKB3 = ''
            
            if (this.props.fieldValue["Diagnosis"] !== undefined){
              Diagnosis = this.getEnumValueText("Diagnosis")
            }
            if (this.props.fieldValue["MainDiagnosis"] !== undefined){
              MainDiagnosis = this.props.fieldValue["MainDiagnosis"]
            }
            if (this.props.fieldValue["CompanionDiagnosis"] !== undefined){
              CompanionDiagnosis = this.props.fieldValue["CompanionDiagnosis"]
            }
            if (this.props.fieldValue["DiseaseComplication"] !== undefined){
              DiseaseComplication = this.props.fieldValue["DiseaseComplication"]
            }
            if (this.props.fieldValue["CompainDagnosisMKB1"] !== undefined){
              CompainDagnosisMKB1 = this.getEnumValueText("CompainDagnosisMKB1")
            }
            if (this.props.fieldValue["CompainDagnosisMKB2"] !== undefined){
              CompainDagnosisMKB2 = this.getEnumValueText("CompainDagnosisMKB2")
            }
            if (this.props.fieldValue["CompainDagnosisMKB3"] !== undefined){
              CompainDagnosisMKB3 = this.getEnumValueText("CompainDagnosisMKB3")
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Диагноз</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Diagnosis}</td>
                </tr> 
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Основной</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {MainDiagnosis}</td>
                </tr> 
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Осложнение болезни</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {DiseaseComplication}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Соп. диагноз по МКБ 1</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {CompainDagnosisMKB1}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Соп. диагноз по МКБ 2</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {CompainDagnosisMKB2}</td>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Соп. диагноз по МКБ 3</th>
                </tr>
                <tr>
                  <td  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td   
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {CompainDagnosisMKB3}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "ExpertDecision"){
            let DisabilityGroup = '' //Enum
            let DisabilityReason = ''//Enum
            let NeedsSupervision = ''//Bool
            let NeedsCare = ''//Bool
            let RestorativeTherapy = ''//Bool
            let ReconstructiveSurgery = ''//Bool
            let HospitalTreatment = ''//Bool
            let Hospitalization = ''//Bool
            
            if (this.props.fieldValue["DisabilityGroup"] !== undefined) {
              DisabilityGroup = "Группа инвалидности: " + this.getEnumValueText("DisabilityGroup") + ", "
            }
            if (this.props.fieldValue["DisabilityReason"] !== undefined) {
              DisabilityReason = "Причина инвалидности: " + this.getEnumValueText("DisabilityReason") + ", "
            }
            if (this.props.fieldValue["NeedsSupervision"] === true || this.props.fieldValue["NeedsSupervision"] ==="True") {
              NeedsSupervision  = "Нуждается в надзоре, "
            }
            if (this.props.fieldValue["NeedsCare"] === true || this.props.fieldValue["NeedsCare"] ==="True") {
              NeedsCare  = "Нуждается в уходе, "
            }
            if (this.props.fieldValue["RestorativeTherapy"] === true || this.props.fieldValue["RestorativeTherapy"] ==="True") {
              RestorativeTherapy  = "Восстановительная терапия, "
            }
            if (this.props.fieldValue["ReconstructiveSurgery"] === true || this.props.fieldValue["ReconstructiveSurgery"] ==="True") {
              ReconstructiveSurgery  = "Реконструктивная  хирургия, "
            }
            if (this.props.fieldValue["HospitalTreatment"] === true || this.props.fieldValue["HospitalTreatment"] ==="True") {
              HospitalTreatment  = "Амбулаторное лечение, "
            }
            if (this.props.fieldValue["Hospitalization"] === true || this.props.fieldValue["Hospitalization"] ==="True") {
              Hospitalization  = "Стационарное лечение, "
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {DisabilityGroup + DisabilityReason + NeedsSupervision + NeedsCare + RestorativeTherapy + RestorativeTherapy + ReconstructiveSurgery + HospitalTreatment + Hospitalization}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "DisabilityPeriod"){
            let ExamDateFrom = '' //DateTime
            let ExamDateTo = ''//DateTime
            let Indefinitely = ''//Bool
            
            if (this.props.fieldValue["ExamDateFrom"] !== undefined) {
              ExamDateFrom = "Инвалидность установлена с: " + this.parseDate(this.props.fieldValue["ExamDateFrom"]) + ", "
            }
            if (this.props.fieldValue["ExamDateTo"] !== undefined) {
              ExamDateTo = "Инвалидность установлена по: " + this.parseDate(this.props.fieldValue["ExamDateTo"]) + ", "
            }
            if (this.props.fieldValue["Indefinitely"] === true || this.props.fieldValue["Indefinitely"] ==="True") {
              Indefinitely = "Бессрочно, " 
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExamDateFrom + ExamDateTo + Indefinitely}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "SickLists"){
            let SickListType = '' //Text
            let SickListSeries = '' //Text
            let SickListPeriodFrom = ''//DateTime
            let SickListPeriodTo = ''//DateTime
            
            if (this.props.fieldValue["SickListType"] !== undefined) {
              SickListType = "Вид: " + this.props.fieldValue["SickListType"] + ", "
            }
            if (this.props.fieldValue["SickListSeries"] !== undefined) {
              SickListSeries = "Серия: " + this.props.fieldValue["SickListSeries"] + ", "
            }
            if (this.props.fieldValue["SickListPeriodFrom"] !== undefined) {
              SickListPeriodFrom = "Период с: " + this.parseDate(this.props.fieldValue["SickListPeriodFrom"]) + ", "
            }
            if (this.props.fieldValue["SickListPeriodTo"] !== undefined) {
              SickListPeriodTo = "Период по: " + this.parseDate(this.props.fieldValue["SickListPeriodTo"]) + ", "
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">{number}</th>
                  <th data-b-a-s="thin" data-f-bold="true">{section.label}</th>
                </tr>
                <tr>
                  <td data-b-a-s="thin"></td>
                  <td data-b-a-s="thin" data-a-h="right" data-a-v="justify">
                    {SickListType + SickListSeries + SickListPeriodFrom + SickListPeriodTo}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "ExamDates"){
            let ExamStartDate = '' //DateTime
            let ExamOfDate = ''//DateTime
            let ExamFinishDate = ''//DateTime
            
            if (this.props.fieldValue["ExamStartDate"] !== undefined) {
              ExamStartDate = "Начало: " + this.parseDate(this.props.fieldValue["ExamStartDate"]) + ", "
            }
            if (this.props.fieldValue["ExamOfDate"] !== undefined) {
              ExamOfDate = "Проведение: " + this.parseDate(this.props.fieldValue["ExamOfDate"]) + ", "
            }
            if (this.props.fieldValue["ExamFinishDate"] !== undefined) {
              ExamFinishDate = "Окончание: " + this.parseDate(this.props.fieldValue["ExamFinishDate"]) + ", "
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ExamStartDate + ExamOfDate + ExamFinishDate}
                  </td>
                </tr>
              </tbody>
            )
          }
        }
        else if(this.props.Form.formName === "ChildIPRForm" || this.props.Form.formName === "AdultsIPRForm"){
          if(section.name === "IPRSection"){
            let IPRNo = '' // Text
            let DisabilityGroup = '' // Enum
            let DisabilityReason = '' // Enum
            let ClinicalMedicalExam = '' // Text
            if (this.props.fieldValue["IPRNo"] !== undefined) {
              IPRNo = "№ ИПР: " + this.props.fieldValue["IPRNo"] + ", "
            }
            if(this.props.fieldValue["DisabilityGroup"] !== undefined){
              DisabilityGroup =  "Группа инвалидности: " + this.getEnumValueText("DisabilityGroup") + ", "
            }
            if(this.props.fieldValue["DisabilityReason"] !== undefined){
              DisabilityReason = "Причина инвалидности: " +  this.getEnumValueText("DisabilityReason")
            }
            if(this.props.fieldValue["ClinicalMedicalExam"] !== undefined){
              ClinicalMedicalExam = this.props.fieldValue["ClinicalMedicalExam"] 
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {IPRNo + DisabilityGroup + DisabilityReason}
                  </td>
                </tr>
                <tr>
                  <th 
                  style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Клинический медицинский осмотр</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ClinicalMedicalExam}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "PersonData"){
            let Last_Name = ''
            let First_Name = ''
            let Middle_Name = ''
            let Date_of_Birth = ''
            let PassportNo = ''
            let Issuing_Authority = ''
            let Date_of_Issue = ''
            let Sex = ''
            for(let i=0; i < this.props.person.attributes.length; i++){
              if(this.props.person.attributes[i].name === "Last_Name"){
                Last_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "First_Name"){
                First_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Middle_Name"){
                Middle_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Birth"){
                Date_of_Birth = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "PassportNo"){
                PassportNo = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Issuing_Authority"){
                Issuing_Authority = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Issue"){
                Date_of_Issue = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "Sex"){
                Sex = this.props.person.attributes[i].enumValueText
              }
            }  
            return(
              <tbody>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Заявитель</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">ФИО</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right" 
                  >
                    {Last_Name + " " + First_Name + " " + Middle_Name }</td>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Данные</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right" 
                  >
                    {"№ " + PassportNo + ", выдан: " + Date_of_Issue + " " + Issuing_Authority}
                  </td>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Дата рождения/пол</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right" 
                  >
                    {Date_of_Birth + ", пол: " + Sex}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "personDetailFormSection"){
            let Country = ''
            let Region = ''
            let District = ''
            let subDistrict = ''
            let Village = ''
            let Phone = ''
            let ResidentialAddress = ''
            if (this.props.fieldValue["Country"] !== undefined) {
              
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  Country = this.props.SOAT.countries[i].name + ", "
                }
              }
            }
            if (this.props.fieldValue["Region"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      Region = this.props.SOAT.countries[i].regions[l].name + ", "
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["District"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          District = this.props.SOAT.countries[i].regions[l].districts[m].name + ", "
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["subDistrict"] !== undefined) {
              for(let i=0; i < this.props.SOAT.countries.length; i++){
                if(this.props.SOAT.countries[i].code === this.props.fieldValue["Country"]){
                  for(let l=0; l < this.props.SOAT.countries[i].regions.length; l++){
                    if(this.props.SOAT.countries[i].regions[l].code === this.props.fieldValue["Region"]){
                      for(let m=0; m < this.props.SOAT.countries[i].regions[l].districts.length; m++){
                        if(this.props.SOAT.countries[i].regions[l].districts[m].code === this.props.fieldValue["District"]){
                          if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts !== undefined){
                            for(let n=0; n < this.props.SOAT.countries[i].regions[l].districts[m].subDistricts.length; n++){
                              if(this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].code === this.props.fieldValue["subDistrict"]){
                                subDistrict = this.props.SOAT.countries[i].regions[l].districts[m].subDistricts[n].name + ", "
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.props.fieldValue["Village"] !== undefined) {
              Village = this.props.fieldValue["Village"] + ", "
            }
            if (this.props.fieldValue["Phone"] !== undefined) {
              Phone = "Тел: " + this.props.fieldValue["Phone"] + ", "
            }
            if (this.props.fieldValue["ResidentialAddress"] !== undefined) {
              ResidentialAddress = "дом/кв/ул: " + this.props.fieldValue["ResidentialAddress"]
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Адресные данные заявителя</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {Country + " " + Region + " " + District  + " " + subDistrict + " " + Village + " " + Phone + " " + ResidentialAddress}
                  </td>
                </tr>
    
              </tbody>
            )
          }
          else if(section.name === "MedicalRehabilitation"){
            let RehabTherapyMed = '' // Bool
            let ReconstructiveurgeryMed = '' // Bool
            let SpaResortTreatmentMed = '' // Bool
            let OtherRehabMed = '' // Text
            let ExpertAdviceMed = '' // Text   
            let MedPerformed = '' // Bool  
            let ExecutionIPRDateMed = '' // DateTime 
            let PlaceExecutionMed = '' // Text 
            let MedNotPerformed = '' // Bool 
            let NotPerformedMed = '' // Text 
            if (this.props.fieldValue["RehabTherapyMed"] === true || this.props.fieldValue["RehabTherapyMed"] ==="True") {
              RehabTherapyMed = "Восстановительная терапия, "
            }
            if(this.props.fieldValue["ReconstructiveurgeryMed"] === true || this.props.fieldValue["ReconstructiveurgeryMed"] ==="True"){
              ReconstructiveurgeryMed = "Реконструктивная хирургия, "
            }
            if(this.props.fieldValue["SpaResortTreatmentMed"] === true || this.props.fieldValue["SpaResortTreatmentMed"] ==="True"){
              SpaResortTreatmentMed = "Санаторно-курортное лечение, "
            }
            if(this.props.fieldValue["OtherRehabMed"] !== undefined){
              OtherRehabMed = "Другое: " + this.props.fieldValue["OtherRehabMed"]
            }
            if(this.props.fieldValue["ExpertAdviceMed"] !== undefined){
              ExpertAdviceMed = this.props.fieldValue["ExpertAdviceMed"]
            }
            if(this.props.fieldValue["MedPerformed"] === true || this.props.fieldValue["MedPerformed"] ==="True"){
              MedPerformed = "Выполнено, "
            }
            if(this.props.fieldValue["ExecutionIPRDateMed"] !== undefined){
              ExecutionIPRDateMed = "Дата выполнения: " + this.parseDate(this.props.fieldValue["ExecutionIPRDateMed"])
            }
            if(this.props.fieldValue["PlaceExecutionMed"] !== undefined){
              PlaceExecutionMed = "Место выполнения: " + this.props.fieldValue["PlaceExecutionMed"]
            }
            if(this.props.fieldValue["MedNotPerformed"] === true || this.props.fieldValue["MedNotPerformed"] ==="True"){
              MedNotPerformed = "Не выполнено, "
            }
            if(this.props.fieldValue["NotPerformedMed"] !== undefined){
              NotPerformedMed = "Причина: " + this.props.fieldValue["NotPerformedMed"]
            }
            
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {RehabTherapyMed + ReconstructiveurgeryMed + SpaResortTreatmentMed + OtherRehabMed}
                  </td>
                </tr>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Рекомендации специалистов ГС МСЭК</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">{ExpertAdviceMed}</td>
                </tr>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Выполнение</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {MedPerformed + ExecutionIPRDateMed + PlaceExecutionMed + MedNotPerformed + NotPerformedMed}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "SocialRehabilitation"){
            let RehabTherapySoc = '' // Bool
            let ReconstructiveurgerySoc = '' // Bool
            let SpecialMobilEquipmentSoc = '' // Bool
            let SpaTreatmentSoc = '' // Bool
            let SpaResortTreatmentSoc = '' // Bool 
            let OtherRehabSoc = '' // Text  
            let ExpertAdviceSoc = '' // Text  
            let SocPerformed = '' // Bool 
            let ExecutionIPRDateSoc = '' // DateTime 
            let PlaceExecutionSoc = '' // Text 
            let SocNotPerformed = '' // Bool 
            let NotPerformedSoc = '' // Text 
            if (this.props.fieldValue["RehabTherapySoc"] === true || this.props.fieldValue["RehabTherapySoc"] ==="True") {
              RehabTherapySoc = "Предоставить протезно-ортопедические услуги, "
            }
            if(this.props.fieldValue["ReconstructiveurgerySoc"] === true || this.props.fieldValue["ReconstructiveurgerySoc"] ==="True"){
              ReconstructiveurgerySoc = "Обеспечить вспомогательными оборудованиями, "
            }
            if(this.props.fieldValue["SpecialMobilEquipmentSoc"] === true || this.props.fieldValue["SpecialMobilEquipmentSoc"] ==="True"){
              SpecialMobilEquipmentSoc = "Обеспечение специальными оборудованиями передвижения, "
            }
            if(this.props.fieldValue["SpaTreatmentSoc"] === true || this.props.fieldValue["SpaTreatmentSoc"] ==="True"){
              SpaTreatmentSoc = "Санаторно-курортное лечение, "
            }
            if(this.props.fieldValue["SpaResortTreatmentSoc"] === true || this.props.fieldValue["SpaResortTreatmentSoc"] ==="True"){
              SpaResortTreatmentSoc = "Социальные услуги, "
            }
            if(this.props.fieldValue["OtherRehabSoc"] !== undefined){
              OtherRehabSoc = "Другое: " + this.props.fieldValue["OtherRehabSoc"]
            }
            if(this.props.fieldValue["ExpertAdviceSoc"] !== undefined){
              ExpertAdviceSoc = this.props.fieldValue["ExpertAdviceSoc"]
            }
            if(this.props.fieldValue["SocPerformed"] === true || this.props.fieldValue["SocPerformed"] ==="True"){
              SocPerformed = "Выполнено, "
            }
            if(this.props.fieldValue["ExecutionIPRDateSoc"] !== undefined){
              ExecutionIPRDateSoc = "Дата выполнения: " + this.parseDate(this.props.fieldValue["ExecutionIPRDateSoc"])
            }
            if(this.props.fieldValue["PlaceExecutionSoc"] !== undefined){
              PlaceExecutionSoc = "Место выполнения: " + this.props.fieldValue["PlaceExecutionSoc"]
            }
            if(this.props.fieldValue["SocNotPerformed"] === true || this.props.fieldValue["SocNotPerformed"] ==="True"){
              SocNotPerformed = "Не выполнено, "
            }
            if(this.props.fieldValue["NotPerformedSoc"] !== undefined){
              NotPerformedSoc = "Причина: " + this.props.fieldValue["NotPerformedSoc"]
            }
            
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {RehabTherapySoc + ReconstructiveurgerySoc + SpecialMobilEquipmentSoc + SpaTreatmentSoc + SpaResortTreatmentSoc + OtherRehabSoc}
                  </td>
                </tr>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Рекомендации специалистов ГС МСЭК</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">{ExpertAdviceSoc}</td>
                </tr>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Выполнение</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {SocPerformed + ExecutionIPRDateSoc + PlaceExecutionSoc + SocNotPerformed + NotPerformedSoc}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "ProfRehabilitation"){
            let RehabTherapyProf = '' // Bool
            let ReconstructiveurgeryProf = '' // Bool
            let SpaResortTreatmentProf = '' // Bool
            let ScheduleBrieflyProf = '' // Text  
            let OtherRehabProf = '' // Text  
            let ExpertAdviceProf = '' // Text  
            let ProfPerformed = '' // Bool 
            let ExecutionIPRDateProf = '' // DateTime 
            let PlaceExecutionProf = '' // Text 
            let ProfNotPerformed = '' // Bool 
            let NotPerformedProf = '' // Text 
            if (this.props.fieldValue["RehabTherapyProf"] === true || this.props.fieldValue["RehabTherapyProf"] ==="True") {
              RehabTherapyProf = "Предоставление специалиста по сурдо переводу, "
            }
            if(this.props.fieldValue["ReconstructiveurgeryProf"] === true || this.props.fieldValue["ReconstructiveurgeryProf"] ==="True"){
              ReconstructiveurgeryProf = "Мероприятие по-психологически педагогический мероприятие, "
            }
            if(this.props.fieldValue["SpaResortTreatmentProf"] === true || this.props.fieldValue["SpaResortTreatmentProf"] ==="True"){
              SpaResortTreatmentProf = "Обеспечение работой через ведомство по труду и занятости населения, "
            }
            if(this.props.fieldValue["ScheduleBrieflyProf"] !== undefined){
              ScheduleBrieflyProf = "Составить график (кратко): " + this.props.fieldValue["ScheduleBrieflyProf"]
            }
            if(this.props.fieldValue["OtherRehabProf"] !== undefined){
              OtherRehabProf = "Другое: " + this.props.fieldValue["OtherRehabProf"]
            }
            if(this.props.fieldValue["ExpertAdviceProf"] !== undefined){
              ExpertAdviceProf = this.props.fieldValue["ExpertAdviceProf"]
            }
            if(this.props.fieldValue["ProfPerformed"] === true || this.props.fieldValue["ProfPerformed"] ==="True"){
              ProfPerformed = "Выполнено, "
            }
            if(this.props.fieldValue["ExecutionIPRDateProf"] !== undefined){
              ExecutionIPRDateProf = "Дата выполнения: " + this.parseDate(this.props.fieldValue["ExecutionIPRDateProf"])
            }
            if(this.props.fieldValue["PlaceExecutionProf"] !== undefined){
              PlaceExecutionProf = "Место выполнения: " + this.props.fieldValue["PlaceExecutionProf"]
            }
            if(this.props.fieldValue["ProfNotPerformed"] === true || this.props.fieldValue["ProfNotPerformed"] ==="True"){
              ProfNotPerformed = "Не выполнено, "
            }
            if(this.props.fieldValue["NotPerformedProf"] !== undefined){
              NotPerformedProf = "Причина: " + this.props.fieldValue["NotPerformedProf"]
            }
            
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {RehabTherapyProf + ReconstructiveurgeryProf + SpaResortTreatmentProf + OtherRehabProf + ScheduleBrieflyProf}
                  </td>
                </tr>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Рекомендации специалистов ГС МСЭК</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">{ExpertAdviceProf}</td>
                </tr>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">Выполнение</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">
                    {ProfPerformed + ExecutionIPRDateProf + PlaceExecutionProf + ProfNotPerformed + NotPerformedProf}
                  </td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Decisions"){
            let Opinions = ''     
            if (this.props.fieldValue["Opinions"] !== undefined) {
              Opinions = this.props.fieldValue["Opinions"] + ", "
            }
            return(
              <tbody>
                <tr>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}>{number}</th>
                  <th style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="left">{section.label}</th>
                </tr>
                <tr>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}}></td>
                  <td style={{border: 1, borderColor: 'black',borderStyle: 'solid'}} align="right">{Opinions}</td>
                </tr>
              </tbody>
            )
          }
        }
        else if(this.props.Form.formName === "memoForm"){
          console.log("Memo FORM")
          if(section.name === "PersonData"){
            
            let IIN = ''
            let First_Name = ''
            let Last_Name = ''
            let Middle_Name = ''
            let Date_of_Birth = ''
            let Sex = ''
            let PassportSeries = ''
            let PassportNo = ''       
            
            for(let i=0; i < this.props.person.attributes.length; i++){
              if(this.props.person.attributes[i].name === "IIN"){
                IIN = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Last_Name"){
                Last_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "First_Name"){
                First_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Middle_Name"){
                Middle_Name = this.props.person.attributes[i].value
              }
              else if(this.props.person.attributes[i].name === "Date_of_Birth"){
                Date_of_Birth = this.parseDate(this.props.person.attributes[i].value)
              }
              else if(this.props.person.attributes[i].name === "Sex"){
                Sex = this.props.person.attributes[i].enumValueText
              }
              else if(this.props.person.attributes[i].name === "PassportSeries"){
                PassportSeries = this.props.person.attributes[i].value
              }  
              else if(this.props.person.attributes[i].name === "PassportNo"){
                PassportNo = this.props.person.attributes[i].value
              }
            }  
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">Заявитель</th>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">ПИН: </th>
                  <td data-b-a-s="thin">{IIN}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Фамилия: </th>
                  <td data-b-a-s="thin">{First_Name}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Имя: </th>
                  <td data-b-a-s="thin">{Last_Name}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Отчество: </th>
                  <td data-b-a-s="thin">{Middle_Name}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Дата рождения: </th>
                  <td data-b-a-s="thin">{Date_of_Birth}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Пол: </th>
                  <td data-b-a-s="thin">{Sex}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Номер серия паспорта</th>
                  <td data-b-a-s="thin">{PassportSeries + PassportNo}</td>
                </tr>
              </tbody>
            )
          }
          else if(section.name === "Doctors"){
            
            let Doctor1 = ''
            let Doctor2 = ''
            let Doctor3 = ''
            let Doctor4 = ''
            let Doctor5 = ''
            let Doctor6 = ''
            let Doctor7 = ''
            let Doctor8 = '' 
            let DoctorAhotner = ''       
            
            if(this.props.fieldValue["Doctor1"] !== undefined){
              Doctor1 = this.getEnumValueText(this.props.fieldValue["Doctor1"])
            }
            if(this.props.fieldValue["Doctor2"] !== undefined){
              Doctor2 = this.getEnumValueText(this.props.fieldValue["Doctor2"])
            }
            if(this.props.fieldValue["Doctor3"] !== undefined){
              Doctor3 = this.getEnumValueText(this.props.fieldValue["Doctor3"])
            }
            if(this.props.fieldValue["Doctor4"] !== undefined){
              Doctor4 = this.getEnumValueText(this.props.fieldValue["Doctor4"])
            }
            if(this.props.fieldValue["Doctor5"] !== undefined){
              Doctor5 = this.getEnumValueText(this.props.fieldValue["Doctor5"])
            }
            if(this.props.fieldValue["Doctor6"] !== undefined){
              Doctor6 = this.getEnumValueText(this.props.fieldValue["Doctor6"])
            }
            if(this.props.fieldValue["Doctor7"] !== undefined){
              Doctor7 = this.getEnumValueText(this.props.fieldValue["Doctor7"])
            }
            if(this.props.fieldValue["Doctor8"] !== undefined){
              Doctor8 = this.getEnumValueText(this.props.fieldValue["Doctor8"])
            }
            if(this.props.fieldValue["DoctorAhotner"] !== undefined){
              DoctorAhotner = this.props.fieldValue["DoctorAhotner"]
            }
            return(
              <tbody>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true">Врачи</th>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Врач1: </th>
                  <td data-b-a-s="thin">{Doctor1}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Врач2 </th>
                  <td data-b-a-s="thin">{Doctor2}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Врач3: </th>
                  <td data-b-a-s="thin">{Doctor3}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Врач4: </th>
                  <td data-b-a-s="thin">{Doctor4}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Врач5: </th>
                  <td data-b-a-s="thin">{Doctor5}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Врач6: </th>
                  <td data-b-a-s="thin">{Doctor6}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Врач7: </th>
                  <td data-b-a-s="thin">{Doctor7}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Врач8: </th>
                  <td data-b-a-s="thin">{Doctor8}</td>
                </tr>
                <tr>
                  <th data-b-a-s="thin" data-f-bold="true" align="left">Другое: </th>
                  <td data-b-a-s="thin">{DoctorAhotner}</td>
                </tr>
              </tbody>
            )
          }
        }
      }
    }
    render() {
        console.log("Download Props", this.props)
        return (
          <table
            id="TableToDownload"
            data-cols-width="3, 82"
            style={{border: 1, borderColor: 'black', borderStyle: 'solid'}} 
          >
            {this.props.Form.sections.map((section, index) => {
              return this.sectionBuilderDownload(section, index)
              })
            }
          </table>
        )
    }
}
export default Download