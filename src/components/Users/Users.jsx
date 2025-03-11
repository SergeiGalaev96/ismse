import React, { useState, useEffect } from 'react';
// import clsx from 'clsx';
// import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import MTable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Select from 'react-select';
import Paper from '@material-ui/core/Paper';
import {
  Table
} from 'reactstrap';
import swal from 'sweetalert' // https://sweetalert.js.org/guides/
import zIndex from '@material-ui/core/styles/zIndex';

export default (props) => {
  // This.state
  const [userId, setUserId] = useState(props.userId)
  const [createUserId] = useState(getUUID())
  const [session_id] = useState(props.session_id)
  const [process_id] = useState(props.process_id)
  const [organizationId] = useState(props.organizationId)
  const [taskID] = useState(props.taskID)
  const [userRole] = useState(props.userRole)
  const [Form] = useState(props.Form)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [formType] = useState(props.formType)
  const [docList, setDocList] = useState(null)
  const [gridFormData, setGridFormData] = useState(props.docList)
  const [gridForm] = useState(props.gridForm)
  const [gridFormButtons] = useState(props.gridFormButtons)
  const [enumData] = useState(props.enumData)
  const [organizationIdList] = useState(props.organizationIdList)
  const [fieldValue, setFieldValue] = useState({ "organizationId": props.organizationId })
  const [selectedOptions, setSelectedOptions] = useState([])
  const [buttons] = useState(props.buttons)

  // Set data from props to state of component
  useEffect(() => {
    if (props.selectedDoc !== "null" && props.selectedDoc !== null) {
      try {
        let parsedDoc = JSON.parse(props.selectedDoc)
        let userRole = getIdByRole(parsedDoc.attributes.userRole[0])
        let fields = {
          // id: parsedDoc.id,
          username: parsedDoc.username,
          firstName: parsedDoc.firstName,
          lastName: parsedDoc.lastName,
          email: parsedDoc.email,
          userRole: userRole,
          userId: parsedDoc.attributes.userId[0],
          organizationId: parsedDoc.attributes.organizationId[0],
          address: parsedDoc.attributes.address[0],
          phone: parsedDoc.attributes.phone[0],
          signDocument: parsedDoc.attributes.signDocument !== undefined ? parsedDoc.attributes.signDocument[0] : false,
          changeStatus: parsedDoc.attributes.changeStatus !== undefined ? parsedDoc.attributes.changeStatus[0] : false
        }
        setFieldValue(fields)
        setSelectedDoc(parsedDoc)
        console.log("SDOC", fields)
      }
      catch (er) {
        console.log("Sel Doc ERR", er)
      }
    }
  }, [])
  // Functions from props 
  function sendFieldValues(commandJson) {
    props.sendFieldValues(commandJson)
  }
  function clearTabData(process_id) {
    props.clearTabData(process_id)
  }

  // Local functions
  function getIdByRole(userRole) {
    for (let i = 0; i < enumData.length; i++) {
      for (let l = 0; l < enumData[i].data.length; l++) {
        if (userRole === enumData[i].data[l].Text) {
          console.log("ROLE", enumData[i].data[l].Text)
          return (enumData[i].data[l].Id)
        }
      }
    }
  }
  // Find users by input parameters
  function filterDocList() {
    let newDocList = []
    if (props.docList !== "null" && props.docList !== null && props.taskType !== "showCreateUser") {
      var parsedGridFormData = JSON.parse(props.docList)
      for (let i = 0; i < parsedGridFormData.length; i++) {
        let orgId = parsedGridFormData[i].attributes.organizationId[0]
        if (userRole === "Администратор") {
          let user = {
            id: parsedGridFormData[i].id,
            username: parsedGridFormData[i].username,
            firstName: parsedGridFormData[i].firstName,
            lastName: parsedGridFormData[i].lastName,
            email: parsedGridFormData[i].email,
            userRole: parsedGridFormData[i].attributes.userRole[0],
            userId: parsedGridFormData[i].attributes.userId[0],
            organizationId: parsedGridFormData[i].attributes.organizationId[0],
            address: parsedGridFormData[i].attributes.address[0],
            phone: parsedGridFormData[i].attributes.phone[0]
          }
          newDocList.push(user)
        }
        else {
          if (orgId === organizationId) {
            let user = {
              id: parsedGridFormData[i].id,
              username: parsedGridFormData[i].username,
              firstName: parsedGridFormData[i].firstName,
              lastName: parsedGridFormData[i].lastName,
              email: parsedGridFormData[i].email,
              userRole: parsedGridFormData[i].attributes.userRole[0],
              userId: parsedGridFormData[i].attributes.userId[0],
              organizationId: parsedGridFormData[i].attributes.organizationId[0],
              address: parsedGridFormData[i].attributes.address[0],
              phone: parsedGridFormData[i].attributes.phone[0]
            }
            newDocList.push(user)
            // console.log("USER", user)
          }
        }
      }
    }
    setGridFormData(parsedGridFormData)
    setDocList(newDocList)
  }
  function getUUID() {
    const uuidv1 = require("uuid/v1")
    return uuidv1()
  }
  function handleTextChange(event) {
    // console.log("EVENT", event.target.name, event.target.value)
    fieldValue[event.target.name] = event.target.value
    setFieldValue(fieldValue)
    console.log("FIELDVALUE", fieldValue)
  }
  function handleSelectChange(event) {
    fieldValue[event.name] = event.value
    setFieldValue(fieldValue)
    let updateSelectedOptions = selectedOptions.slice()
    let noSuchOption = true
    for (let i = 0; i < updateSelectedOptions.length; i++) {
      if (event.name === updateSelectedOptions[i].name) {
        updateSelectedOptions[i] = event
        setSelectedOptions(updateSelectedOptions)
        // console.log("SO", selectedOptions)
        noSuchOption = false
        break
      }
      else {
        noSuchOption = true
      }
    }
    if (noSuchOption === true) {
      updateSelectedOptions.push(event)
      setSelectedOptions(updateSelectedOptions)
      // console.log("SO", selectedOptions)
    }
  }
  const handleCheckboxChange = (event) => {
    setFieldValue({ ...fieldValue, [event.target.name]: event.target.checked })
    // console.log("new checkbox status", fieldValue[event.target.name])
  }
  function getRole() {
    for (let k = 0; k < enumData.length; k++) {
      for (let d = 0; d < enumData[k].data.length; d++) {
        if (fieldValue["userRole"] === enumData[k].data[d].Id) {
          return enumData[k].data[d].Text
        }
      }
    }
  }
  // Collect data to create new user
  function getFieldValuesKeycloakCreate() {
    let data = {
      username: fieldValue["username"],
      firstName: fieldValue["firstName"],
      lastName: fieldValue["lastName"],
      email: fieldValue["email"] !== undefined ? fieldValue["email"] : "",
      emailVerified: true,
      enabled: true,
      requiredActions: ["UPDATE_PASSWORD"],
      attributes:
      {
        locale: "ru",
        organizationId: fieldValue["organizationId"],
        userId: "12345", // Will be replaced with id from cre3ated user in asist REST
        userRole: fieldValue["userRole"] !== undefined ? getRole() : "",
        address: fieldValue["address"] !== undefined ? fieldValue["address"] : "",
        phone: fieldValue["phone"] !== undefined ? fieldValue["phone"] : "",
        signDocument: fieldValue["signDocument"] !== undefined ? fieldValue["signDocument"] : "",
        changeStatus: fieldValue["changeStatus"] !== undefined ? fieldValue["changeStatus"] : ""
      },
      credentials: [
        {
          type: "password",
          value: "12345"
        }
      ]
    }
    return data
  }
  // Collect data to create new user in REST
  function getFieldValuesRest() {
    var generator = require('generate-password');

    var password = generator.generate({
      length: 10,
      numbers: true
    })
    let data = {
      "UserName": fieldValue["username"],
      "Password": password,
      "LastName": fieldValue["lastName"],
      "FirstName": fieldValue["firstName"],
      "Address": fieldValue["address"] !== undefined ? fieldValue["address"] : "",
      "Phone": fieldValue["phone"] !== undefined ? fieldValue["phone"] : "",
      "Email": fieldValue["email"] !== undefined ? fieldValue["email"] : "",
      "ParentId": getParentId(),
      "OrgPositionId": "F464D1AD-C648-4302-8AAB-BCABBCC406E6",
      "UserId": userId, // Needs existing user id
      "Sex": true,
      "LanguageId": 4
    }
    return data
  }
  // Collect data to show user creating form
  function getFieldValuesSelectedDoc() {
    let data = {
      username: fieldValue["username"] !== undefined ? fieldValue["username"] : "",
      firstName: fieldValue["firstName"] !== undefined ? fieldValue["firstName"] : "",
      lastName: fieldValue["lastName"] !== undefined ? fieldValue["lastName"] : "",
      email: fieldValue["email"] !== undefined ? fieldValue["email"] : "",
      attributes:
      {
        organizationId: [fieldValue["organizationId"]],
        userId: userId,
        userRole: [getRole()],
        address: [fieldValue["address"] !== undefined ? fieldValue["address"] : ""],
        phone: [fieldValue["phone"] !== undefined ? fieldValue["phone"] : ""],
        signDocument: [fieldValue["signDocument"] !== undefined ? fieldValue["signDocument"] : ""],
        changeStatus: [fieldValue["changeStatus"] !== undefined ? fieldValue["changeStatus"] : ""]
      }
    }
    return data
  }
  // Collect data to update existed user
  function getFieldValuesKeycloakUpdate() {
    let data = {
      firstName: fieldValue["firstName"],
      lastName: fieldValue["lastName"],
      email: fieldValue["email"],
      emailVerified: true,
      enabled: true,
      attributes:
      {
        locale: "ru",
        organizationId: fieldValue["organizationId"],
        userId: fieldValue["userId"],
        userRole: getRole(),
        address: fieldValue["address"],
        phone: fieldValue["phone"],
        signDocument: fieldValue["signDocument"],
        changeStatus: fieldValue["changeStatus"],
      }
    }
    return data
  }
  // Collect data to reset existed user password
  function getFieldValuesKeycloakResetPassword() {
    let data = {
      firstName: fieldValue["firstName"],
      lastName: fieldValue["lastName"],
      email: fieldValue["email"],
      emailVerified: true,
      enabled: true,
      requiredActions: ["UPDATE_PASSWORD"],
      attributes:
      {
        locale: "ru",
        organizationId: organizationId,
        userId: fieldValue["userId"],
        userRole: getRole(),
        address: fieldValue["address"],
        phone: fieldValue["phone"]
      },
      credentials: [
        {
          type: "password",
          value: "12345"
        }
      ]
    }
    return data
  }
  // Get Id of Org id created in asist and compare with local Org id by label
  function getParentId() {
    let orgId = null
    for (let i = 0; i < enumData.length; i++) {
      for (let l = 0; l < enumData[i].data.length; l++) {
        if (fieldValue["organizationId"] === enumData[i].data[l].Id) {
          // console.log("ORG TEXT", enumData[i].data[l].Text)
          for (let n = 0; n < organizationIdList.length; n++) {
            if (organizationIdList[n].Text === enumData[i].data[l].Text) {
              // console.log("ParentID", organizationIdList[n].Id)
              // return organizationIdList[n].Id
              orgId = organizationIdList[n].Id
            }
          }
        }
      }
    }
    if(orgId === null){
      swAllert("Не найдена организация!", "warning")
    }
    return orgId
  }
  
  // Validate input data
  function checkForWrongFields(commandJson) {
    let enabledToSend = false
    var parsedGridFormData = JSON.parse(props.docList)
    if (fieldValue["userRole"] !== undefined && fieldValue["userRole"] !== "") {
      if (fieldValue["organizationId"] !== undefined && fieldValue["organizationId"] !== "") {
        if (fieldValue["username"] !== undefined && fieldValue["username"] !== "") {
          if (fieldValue["firstName"] !== undefined && fieldValue["firstName"] !== "") {
            if (fieldValue["lastName"] !== undefined && fieldValue["lastName"] !== "") {
              for (let i = 0; i < parsedGridFormData.length; i++) {
                if (parsedGridFormData[i].username === fieldValue["username"]) {
                  enabledToSend = false
                  return swAllert("Пользователь с таким логином уже существует", "warning")
                } else enabledToSend = true
              }
            } else swAllert("Введите Имя", "warning")
          } else swAllert("Введите Фамилию", "warning")
        } else swAllert("Введите Логин", "warning")
      } else swAllert("Введите Наименование МСЭК", "warning")
    } else swAllert("Введите Роль", "warning")
    if (enabledToSend === true) {
      sendFieldValues(commandJson)
      clearTabData(process_id)
      swAllert("Пользователь успешно создан!", "success")
    }
  }
  function swAllert(text, icon) {
    return (
      swal({
        text: text,
        icon: icon,
        buttons: { ok: "Ок" },
      })
        .then((click) => {
          if (click === "ok") {
            console.log("CLICK OK", click)
          }
        })
    )
  }
  async function buttonClick(name, item) {
    if (name === "createUser") {
      let KeycloakDoc = getFieldValuesSelectedDoc()
      let commandJson =
      {
        commandType: "completeTask",
        session_id: session_id,
        process_id: process_id,
        taskID: taskID,
        userId: userId,
        userRole: userRole,
        variables: {
          authorization: { value: null },
          userAction: { value: "createUser" },
          selectedDoc: { value: JSON.stringify(KeycloakDoc) }
        }
      }
      console.log("button createUser: ", commandJson)
      sendFieldValues(commandJson)
      clearTabData(process_id)
    }
    else if (name === "saveUser") {
      let KeycloakDoc = getFieldValuesKeycloakCreate()
      let RestDoc = getFieldValuesRest()
      let commandJson =
      {
        commandType: "completeTask",
        session_id: session_id,
        process_id: process_id,
        taskID: taskID,
        userId: userId,
        userRole: userRole,
        variables: {
          authorization: { value: null },
          userAction: { value: "saveUser" },
          keycloakUserData: { value: JSON.stringify(KeycloakDoc) },
          restUserData: { value: JSON.stringify(RestDoc) }
        }
      }
      console.log("button saveUser: ", commandJson)
      checkForWrongFields(commandJson)
    }
    else if (name === "findUser") {
      let newDocList = []
      for (let i = 0; i < gridFormData.length; i++) {
        let orgId = gridFormData[i].attributes.organizationId[0]
        if (userRole === "Администратор") {
          let user = {
            id: gridFormData[i].id,
            username: gridFormData[i].username,
            firstName: gridFormData[i].firstName,
            lastName: gridFormData[i].lastName,
            email: gridFormData[i].email,
            userRole: gridFormData[i].attributes.userRole[0],
            userId: gridFormData[i].attributes.userId[0],
            organizationId: gridFormData[i].attributes.organizationId[0],
            address: gridFormData[i].attributes.address[0],
            phone: gridFormData[i].attributes.phone[0]
          }
          newDocList.push(user)
        }
        else {
          if (orgId === organizationId) {
            let user = {
              id: gridFormData[i].id,
              username: gridFormData[i].username,
              firstName: gridFormData[i].firstName,
              lastName: gridFormData[i].lastName,
              email: gridFormData[i].email,
              userRole: gridFormData[i].attributes.userRole[0],
              userId: gridFormData[i].attributes.userId[0],
              organizationId: gridFormData[i].attributes.organizationId[0],
              address: gridFormData[i].attributes.address[0],
              phone: gridFormData[i].attributes.phone[0]
            }
            newDocList.push(user)
          }
        }

      }
      let filteredDocList = []
      for (let i = 0; i < newDocList.length; i++) {
        let mathedResult = false
        for (let item in fieldValue) {
          if (fieldValue[item] !== "") {
            if (item === "userRole") {
              for (let k = 0; k < selectedOptions.length; k++) {
                if (fieldValue[item] === selectedOptions[k].value) {
                  if (selectedOptions[k].label === newDocList[i][item]) {
                    console.log("Find", selectedOptions[k].label, newDocList[i][item])
                    mathedResult = true
                    break
                  }
                  else { mathedResult = false }
                }
                else { mathedResult = false }
              }
            }
            else {
              if (fieldValue[item] === newDocList[i][item]) {
                mathedResult = true
              }
              else { mathedResult = false }
            }
          }
        }
        if (mathedResult === true) {
          filteredDocList.push(newDocList[i])
        }
      }
      setDocList(filteredDocList)
    }
    else if (name === "editUser") {
      console.log("ITEM", item)
      let commandJson =
      {
        commandType: "completeTask",
        session_id: session_id,
        process_id: process_id,
        taskID: taskID,
        userId: userId,
        userRole: userRole,
        variables: {
          authorization: { value: null },
          userAction: { value: "editUser" },
          keycloakUserId: { value: item.id }
        }
      }
      console.log("button editUser: ", commandJson)
      sendFieldValues(commandJson)
      clearTabData(process_id)
    }
    else if (name === "updateUser") {
      var userData = getFieldValuesKeycloakUpdate()
      let commandJson =
      {
        commandType: "completeTask",
        session_id: session_id,
        process_id: process_id,
        taskID: taskID,
        userId: userId,
        userRole: userRole,
        variables: {
          authorization: { value: null },
          userAction: { value: "updateUser" },
          keycloakUserId: { value: selectedDoc.id },
          keycloakUserData: { value: JSON.stringify(userData) }
        }
      }
      console.log("button updateUser:", commandJson, item)
      sendFieldValues(commandJson)
      props.callSuccessToast("Пользователь обновлен!", "success")
      clearTabData(process_id)
    }
    else if (name === "resetPassword") {
      swal({
        text: "Вы точно хотите сбросить пароль?",
        icon: "warning",
        buttons: { ok: "Да", cancel: "Отмена" }
      })
        .then((click) => {
          if (click === "ok") {
            var userData = getFieldValuesKeycloakResetPassword()
            let commandJson =
            {
              commandType: "completeTask",
              session_id: session_id,
              process_id: process_id,
              taskID: taskID,
              userId: userId,
              userRole: userRole,
              variables: {
                authorization: { value: null },
                userAction: { value: "updateUser" },
                keycloakUserId: { value: selectedDoc.id },
                keycloakUserData: { value: JSON.stringify(userData) }
              }
            }
            sendFieldValues(commandJson)
            swAllert("Пароль успешно сброшен!", "success")
            clearTabData(process_id)
            console.log("button updateUser:", commandJson, item)
          }
        })
    }
    else if (name === "deleteUser") {
      swal({
        text: "Вы точно хотите удалить этот документ?",
        icon: "warning",
        buttons: { yes: "Да", no: "Нет" },
        dangerMode: true,
      })
        .then((click) => {
          if (click === "yes") {
            let commandJson =
            {
              commandType: "completeTask",
              session_id: session_id,
              process_id: process_id,
              taskID: taskID,
              userId: userId,
              userRole: userRole,
              variables: {
                authorization: { value: null },
                userAction: { value: "deleteUser" },
                keycloakUserId: { value: selectedDoc.id }
              }
            }
            console.log("button deleteUser:", commandJson, item)
            sendFieldValues(commandJson)
            clearTabData(process_id)
            props.callSuccessToast("Пользователь удален!")
          }
        })

    }
    else if (name === "back") {
      let commandJson =
      {
        commandType: "completeTask",
        session_id: session_id,
        process_id: process_id,
        taskID: taskID,
        userId: userId,
        userRole: userRole,
        variables: {
          userAction: { value: "back" },
        }
      }
      console.log("button back:", commandJson)
      sendFieldValues(commandJson)
      clearTabData(process_id)
    }
    else if (name === "cancel") {
      const commandJson =
      {
        commandType: "completeTask",
        process_id: process_id,
        session_id: session_id,
        taskID: taskID,
        userRole: userRole,
        variables: {
          userAction: { value: "cancel" },
        }
      }
      console.log("button cancel: ", commandJson)
      sendFieldValues(commandJson)
      clearTabData(process_id)
    }
    else {
      console.log("Button ", name)
    }
  }
  function sectionBuilder(section, index) {
    // creating table and label of section and components
    return (
      <MTable size="small">
        <TableHead>
          <TableRow style={{ height: 30 }}>
            <TableCell style={{
              color: "black",
              fontSize: 14,
              backgroundColor: "#D3D3FE"
            }}>{section.label}</TableCell>
            <TableCell style={{ backgroundColor: "#D3D3FE" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {section.contents.map((contentItem, index) => (
            <TableRow style={{ height: 30, maxWidth: 200 }}>
              {contentItem.label !== "" &&
                <TableCell
                  align="left"
                  style={{ maxWidth: 200 }}>
                  {contentItem.label}
                </TableCell>
              }
              <TableCell
                align="left"
                style={{ maxWidth: 200, height: 30 }}
              >{contentBuilder(contentItem)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MTable>
    )
  }
  function contentBuilder(contentItem) {
    // Creating components by it's type
    if (contentItem.type === "Text") {
      return (
        <TextField
          multiline
          // onChange = {componentChange}
          onBlur={handleTextChange}
          name={contentItem.name}
          style={{ minWidth: 250 }}
          disabled={(formType === "view" || contentItem.edit === false) ? true : false}
          defaultValue={(fieldValue[contentItem.name]) ? fieldValue[contentItem.name] : ""}
        />
      )
    }

    else if (contentItem.type === "Enum") {
      let options = []
      options.push({
        "value": "",
        "label": "",
        "name": contentItem.name
      })
      for (let i = 0; i < enumData.length; i++) {
        if (contentItem.enumDef === enumData[i].enumDef) {
          for (let l = 0; l < enumData[i].data.length; l++) {
            options.push({
              "value": enumData[i].data[l].Id,
              "label": enumData[i].data[l].Text,
              "name": contentItem.name
            })
          }
        }
      }
      let selectedOption = {
        "value": "",
        "label": "",
        "name": contentItem.name
      }
      // console.log("ORG", contentItem.name, fieldValue[contentItem.name], organizationId)
      if (fieldValue[contentItem.name] !== undefined) {
        for (let i = 0; i < options.length; i++) {
          if (fieldValue[contentItem.name] === options[i].value) {
            selectedOption = options[i]
            // console.log("OPT", options[i])
            break
          }
        }
      }
      if (selectedOptions.length !== 0) {
        for (let i = 0; i < selectedOptions.length; i++) {
          if (contentItem.name === selectedOptions[i].name) {
            selectedOption = selectedOptions[i]
          }
        }
      }
      return (
        <Select
          name={contentItem.name}
          // value = {() => setSelectedOption(options, contentItem.name)}
          value={selectedOption}
          onChange={handleSelectChange}
          options={options}
          isDisabled={(formType === "view" || contentItem.edit === false) ? true : false}
          menuPortalTarget={document.body}
          styles={{ height: 30, minWidth: 150, menuPortal: base => ({ ...base, zIndex: 9999 })}}
        />
      )
    }
    else if (contentItem.type === "Bool") {
      return (
        <Checkbox
          style={{ maxWidth: 20, height: 15, color: (formType === "view" || contentItem.edit === false) ? "grey" : "green" }}
          name={contentItem.name}
          onChange={handleCheckboxChange}
          disabled={(formType === "view" || contentItem.edit === false) ? true : false}
          checked={(fieldValue[contentItem.name] === "true" || fieldValue[contentItem.name] === true) ? true : false}
        />
      )
    }
    // else if(contentItem.type === "Password"){
    //   return(
    //     <OutlinedInput
    //       name = {contentItem.name}
    //       id="outlined-adornment-password"
    //       type={values.showPassword ? 'text' : 'password'}
    //       value={values[contentItem.name]}
    //       // onChange = {handlePasswordChange(contentItem.name)}
    //       style={{height: 35}}
    //       onBlur = {handleTextChange}
    //       endAdornment={
    //         <InputAdornment position="end">
    //           <IconButton
    //             aria-label="toggle password visibility"
    //             onClick={handleClickShowPassword}
    //             // onMouseDown={handleMouseDownPassword}
    //             edge="end"
    //           >
    //             {values.showPassword ? <Visibility /> : <VisibilityOff />}
    //           </IconButton>
    //         </InputAdornment>
    //       }
    //     />
    //   )
    // }
  }
  function getGridFormItems(value, type) {
    if (type === "Enum") {
      for (let i = 0; i < enumData.length; i++) {
        for (let l = 0; l < enumData[i].data.length; l++) {
          if (enumData[i].data[l].Id === value) {
            return enumData[i].data[l].Text
          }
        }
      }
    }
    else {
      return value
    }
  }
  console.log("UserForm props", props)
  console.log("FIELDS", fieldValue)
  console.log("SOP", selectedOptions)
  if (docList === null) {
    filterDocList()
  }
  if (docList !== null)
    try {
      return (
        <Grid>
          <Grid container direction="row" justify="flex-start" spacing={1}>
            <Grid item xs={10}>
              <Card>
                <MTable>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <TableHead>
                      <TableRow style={{ maxHeight: 25 }}>
                        <TableCell style={{ fontSize: 16, color: "black" }}>{Form.label}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Grid>
                  <Grid container direction="row" justify="center" alignItems="center">
                    {Form.sections.map((section, index) => {
                      return sectionBuilder(section, index)
                    })}
                  </Grid>
                  <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    {buttons.map((button, index) =>
                      // return createButton(button, index)
                      <Button
                        name={button.name}
                        variant="outlined"
                        // id={dataItem.id}
                        value={button.name}
                        onClick={() => buttonClick(button.name, null)}
                        style={{
                          margin: 3,
                          backgroundColor: button.backgroundColor,
                          height: 32,
                          fontSize: 12
                        }}
                      >{button.label}
                      </Button>
                    )}
                  </Grid>
                </MTable>
              </Card>
            </Grid>
          </Grid>
          <br></br>
          {Object.keys(docList).length !== 0 &&  // DocListData
            <Grid container direction="row" justify="flex-start" spacing={0}>
              <Grid item sm={"auto"}>
                <Card>
                  <Paper>
                    <Table bordered size="small">
                      <TableHead style={{ backgroundColor: "#D3D3FE" }}>
                        <tr>
                          <th colSpan="1"></th>
                          {gridForm.sections.map((section, index) => {
                            return (
                              <th colSpan={section.contents.length} style={{ color: "black", fontSize: 13 }}>{section.label}</th>
                            )
                          })}
                        </tr>
                        <tr>
                          <th rowSpan="2" style={{ color: "black", fontSize: 12, minWidth: 75 }}>Действие</th>
                        </tr>
                        <tr>
                          {gridForm.sections.map(section =>
                            section.contents.map((contentItem, index) => {
                              return (
                                <th rowSpan="2" style={{ color: "black", fontSize: 12 }}>{contentItem.label}</th>
                              )
                            })
                          )}
                        </tr>
                      </TableHead>
                      <TableBody>
                        {docList.map((dataItem, index) => (
                          <tr style={{ height: 30 }}>
                            <td style={{ maxWidth: 50 }}>
                              {gridFormButtons !== null &&
                                gridFormButtons.map((button, index) =>
                                  <Button
                                    name={button.name}
                                    variant="outlined"
                                    // id={dataItem.id}
                                    value={button.name}
                                    onClick={() => buttonClick(button.name, dataItem)}
                                    style={{
                                      margin: 1,
                                      height: 24,
                                      fontSize: 9,
                                      maxWidth: 32,
                                      backgroundColor: button.backgroundColor
                                    }}
                                  >{button.label}
                                  </Button>
                                )}
                            </td>
                            {gridForm.sections.map(section => {
                              return (
                                section.contents.map(contentItem => {
                                  for (let key in dataItem) {
                                    if (key === contentItem.name) {
                                      if (dataItem[key] === null || dataItem[key] === "") {
                                        return (
                                          <td align="center" style={{ color: "black", fontSize: 12 }}>-</td>
                                        )
                                      }
                                      else {
                                        return (
                                          <td align="center" style={{ color: "black", fontSize: 12 }}>
                                            {/* {dataItem[key]} */}
                                            {getGridFormItems(dataItem[key], contentItem.type)}
                                          </td>
                                        )
                                      }
                                    }
                                  }
                                })
                              )
                            })}
                          </tr>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </Card>
              </Grid>
            </Grid>
          }

        </Grid>
      )
    } catch (error) {
      console.log("ERROR", error)
    }
};
