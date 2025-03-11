import React, { useState, useEffect } from "react";
import clsx from "clsx";
// import { ToastContainer, toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import toast, { Toaster } from 'react-hot-toast'; // https://react-hot-toast.com/docs
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CircularProgress from "@material-ui/core/CircularProgress";
// import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ComponentManager from "../components/ComponentManager/ComponentManager.jsx";
import AddCircleIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToAppOutlined";
import Box from "@material-ui/core/Box";
// import TextField from "@material-ui/core/TextField";
// import KcAdminClient from "keycloak-admin";
import CloseIcon from "@material-ui/icons/Close";
// import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Notification from "@material-ui/icons/Notifications";
import Badge from '@material-ui/core/Badge';
import { useKeycloak } from "../lib";
import swal from "sweetalert" // https://sweetalert.js.org/guides/
import Button from "@material-ui/core/Button";
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Modal from "@material-ui/core/Modal";
// import { createFolders } from "@linways/table-to-excel";
import Card from "@material-ui/core/Card";
import LinearProgress from '@material-ui/core/LinearProgress';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ScannerIcon from '@material-ui/icons/Scanner';
import GetAppIcon from '@material-ui/icons/GetApp';
import SearchIcon from '@material-ui/icons/Search';

function TabPanel(props) {
  const { children, currentTab, selectedTab, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={currentTab !== selectedTab}
      id={`scrollable-auto-tabpanel-${selectedTab}`}
      aria-labelledby={`scrollable-auto-tab-${selectedTab}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}
function a11yProps(id) {
  return {
    id: `scrollable-auto-tab-${id}`,
    "aria-controls": `scrollable-auto-tabpanel-${id}`
  }
}
var HashMap = require("hashmap")
const drawerWidth = 260
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "fixed",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  imagePaper: {
    position: "fixed",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  hrefStyleTop: {
    position: 'absolute',
    backgroundColor: "white",
    border: '1px solid grey',
    height: "35px",
    width: "35px"
  },
  hrefStyleBottom: {
    position: 'absolute',
    backgroundColor: "white",
    border: '1px solid grey',
    height: "35px",
    width: "35px"
  }
}))

const useStylesnav = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  listItemText: {
    fontSize: 13,
    paddingLeft: "2px",
  },
  level1: {
    paddingLeft: theme.spacing(0),
    maxHeight: 25
  },
  level2: {
    paddingLeft: theme.spacing(2),
    maxHeight: 25
  },
  level3: {
    paddingLeft: theme.spacing(4),
    maxHeight: 25
  },
  tabs: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}))
function getHrefStyleTop() {
  const bottom = 7;
  const right = 2;
  return {
    bottom: `${bottom}%`,
    right: `${right}%`,
    transform: `translate(-${bottom}%, -${right}%)`,
  };
}
function getHrefStyleBottom() {
  const bottom = 2;
  const right = 2;
  return {
    bottom: `${bottom}%`,
    right: `${right}%`,
    transform: `translate(-${bottom}%, -${right}%)`,
  };
}

var scannedImages = []
var scannedBlobs = []
var loadedImages = []
var selectedTabDocId = null
var selectedImg = {}
var showImage = null
export default () => {
  const { keycloak } = useKeycloak();
  // This.state
  const [selectedTab, setSelectedTab] = useState(null)
  const [tabs, setTabs] = useState([])
  // const [wsEndpoint] = useState("ws://192.168.0.64:3120")// Prod Server 64
  // const [wsEndpoint] = useState("ws://192.168.0.72:3120")// Test Server 72
  // const [wsEndpoint] = useState("ws://localhost:3320")// Local
  const wsEndpoint = process.env.NODE_ENV === "production" ? "ws://192.168.0.72:3120" : "ws://localhost:3320"
  const ismseApi = "http://192.168.0.64/ismse-rest-api"
  const [routes, setRoutes] = useState([])
  const [session_id, setSession_id] = useState(null)
  const [webSocketMessage, setWebSocketMessage] = useState(null)
  const [currTaskId, setCurrTaskId] = useState("")
  // const [SOAT, setSOAT] = useState(null)
  const [opennav, setOpennav] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(true)
  const [processInfo, setProcessInfo] = useState(null)
  const [tabCounter, setTabCounter] = useState(1)
  const [menuItemStates, setMenuItemStates] = useState([])
  const [socket, setSocket] = useState(null)
  const [tabData] = useState(new HashMap())
  const [childList, setChildList] = useState(0)
  // User
  const [userId, setUserId] = useState(null)
  const [organizationId, setOrganizationId] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState(null)
  const [userFullName, setUserFullName] = useState(null)
  const [signDocument, setSignDocument] = useState(null)
  const [changeStatus, setChangeStatus] = useState(null)
  // Scanner
  const [showScanComponent, setShowScanComponent] = useState(false)
  const [connectionFailed, setConnectionFailed] = useState(false)
  const [updateState, setUpdateState] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [warningShowed, setWarningShowed] = useState(false)

  const [hrefStyleTop] = useState(getHrefStyleTop)
  const [hrefStyleBottom] = useState(getHrefStyleBottom)
  const classes = useStyles()
  const classesnav = useStylesnav()
  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }
  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Main socket connection and data receiving
  if (socket === null && userRole !== null) {
    setSocket(new WebSocket(wsEndpoint))
  }
  if (socket !== null) {
    socket.onmessage = async function (message) {
      var incomingJson = JSON.parse(message.data)
      // console.log("Socket message", incomingJson)
      if (incomingJson.messageType === "session_id") {
        setSession_id(incomingJson.session_id)
        socket.send(JSON.stringify({ commandType: "userRole", userRole: userRole, "session_id": incomingJson.session_id, "userId": userId }))
        console.log("session_id", incomingJson.session_id)
      }
      else if (incomingJson.messageType === "Menu") {
        setRoutes(incomingJson.routes)
        // console.log("Menu Items", incomingJson)
        let updatedMenuItemStates = menuItemStates.slice()
        for (let i = 0; i < incomingJson.routes.length; i++) {
          if (incomingJson.routes[i].level2 !== undefined) {
            // console.log("menuItemStates", incomingJson.routes[i].level2)
            let name = incomingJson.routes[i].name
            let state = incomingJson.routes[i].state
            let newMenuItem = {
              name: name,
              state: state
            }
            updatedMenuItemStates.push(newMenuItem)
            for (let l = 0; l < incomingJson.routes[i].level2.length; l++) {
              if (incomingJson.routes[i].level2[l].level3 !== undefined) {
                let name = incomingJson.routes[i].level2[l].name
                let state = incomingJson.routes[i].level2[l].state
                let newMenuItem2 = {
                  name: name,
                  state: state
                }
                updatedMenuItemStates.push(newMenuItem2)
              }
            }
          }
        }
        // console.log("MENU States", updatedMenuItemStates)
        setMenuItemStates(updatedMenuItemStates)
        socket.send(JSON.stringify({ commandType: "restoreSession", "userId": userId, "session_id": session_id, "userRole": userRole }))
      }
      else if (incomingJson.messageType === "ChildList") {
        setChildList(incomingJson.total)
      }
      else if (incomingJson.messageType === "processInfo") {
        setProcessInfo(incomingJson)
        // console.log("processInfo", incomingJson)
      }
      else if (incomingJson.messageType === "completeTask") {
        console.log("Task complited ", incomingJson)
      }
      // else if (incomingJson.messageType === "userTask") {
      //   console.log("USER TASK", incomingJson)
      //   if (tabData.get(incomingJson.process_id) !== undefined) {
      //     await clearTabData(incomingJson.process_id)
      //   }
      //   await tabData.set(incomingJson.process_id, incomingJson)
      //   await setCurrTaskId(incomingJson.taskID)
      //   await setWebSocketMessage(incomingJson)
      // }
      else if (incomingJson.messageType === "userTask") {
        // console.log("NEW TASK", incomingJson)
        let tabExist = false // If tab not exist open it to copy workspace on different machines
        for(let i=0; i<tabs.length; i++){
          if(tabs[i].id === incomingJson.process_id){
            tabExist = true
            break
          }
        }
        if(tabExist === false){
          let updatedTabs = tabs.slice()
          updatedTabs.push({ id: incomingJson.process_id, name: incomingJson.process_id, label: incomingJson.tabLabel + " " + tabCounter })
          setTabs(updatedTabs)
          setSelectedTab(incomingJson.process_id)
          setTabCounter(tabCounter + 1)
        }
        tabData.remove(incomingJson.process_id)
        setCurrTaskId(incomingJson.taskID)
        await tabData.set(incomingJson.process_id, incomingJson)
        setWebSocketMessage(incomingJson)
      }
      else if (incomingJson.messageType === "restoreTab") {
        // console.log("EXISTED DATA", tabData.get(incomingJson.process_id))
      console.log("RESTORE", incomingJson)

        // if (tabData.get(incomingJson.process_id) === undefined) { 
          await tabData.set(incomingJson.process_id, incomingJson)
          let updatedTabs = tabs.slice()
          updatedTabs.push({ id: incomingJson.process_id, name: incomingJson.process_id, label: incomingJson.tabLabel + " " + tabCounter })
          setTabs(updatedTabs)
          if (tabCounter === 1) {
            setSelectedTab(incomingJson.process_id)
            setCurrTaskId(incomingJson.taskID)
          }
          // setSelectedTab(incomingJson.process_id)
          // setCurrTaskId(incomingJson.taskID)
          setTabCounter(tabCounter + 1)
          setWebSocketMessage(incomingJson)
          // // console.log("restoreTab", incomingJson)
        // }
        // else{

        // }
      }
      else if (incomingJson.messageType === "error") {
        // setWebSocketMessage(incomingJson)
        console.log("webSocket ERROR", incomingJson)
        // tabData.set(incomingJson.process_id, incomingJson)
        // setCurrTaskId(incomingJson.taskID)
        // handleCloseCurrentTab(incomingJson.process_id)
      }
      else if (incomingJson.messageType === "LoadImages") {
        // console.log("IMAGES FROM SOCKET", incomingJson)
        var base64Image = 'data:image/png;base64,' + incomingJson.content
        let incomigImg = { item: <img docId={incomingJson.docId} name={incomingJson.name} height="200" width="auto" src={base64Image} onClick={() => loadedImgClick(incomingJson.name)} /> }
        loadedImages.push(incomigImg)
        setShowLoading(false)
        let newId = getUUID()
        setUpdateState(newId)
      }
      else if (incomingJson.messageType === "notification") {
        setShowLoading(false)
        callSuccessToast(incomingJson.toastText)
      }
      else if (incomingJson.messageType === "toast") {
        if (incomingJson.toastType === "success") {
          callSuccessToast(incomingJson.toastText)
        }
        else if (incomingJson.toastType === "error") {
          // console.log("ERR TOAST", incomingJson.toastText)
          callErrorToast(incomingJson.toastText)
        }
      }
      else {
        console.log("Unknown RESTMessage", incomingJson)
      }
    }
    socket.onclose = function (er) {
      console.log("CONNECTION CLOSED ")
      setSocket(null)
    }
  }

  // Functions of Document Scanner
  // Keep updated doc id of selected tab document
  // if (selectedTab !== null) {
  //   let selectedTabData = tabData.get(selectedTab)
  //   if (selectedTabData !== undefined) {
  //     let selectedTabDataDocId = selectedTabData.docId
  //     selectedTabDocId = selectedTabDataDocId
  //     // console.log("DOC ID", selectedTabDocId)
  //   }
  // }
  // useEffect(() => {
  //   // console.log("DOC ID", selectedTabDocId)
  //   // setTabData(new HashMap())
  //   // socket for scanner
  //   var wsImpl = window.WebSocket || window.MozWebSocket
  //   window.ws = new wsImpl("ws://localhost:8181/")
  //   window.ws.onmessage = async function (e) {
  //     if (e.data instanceof Blob) {
  //       console.log("SCAN MSG", e)
  //       let f = e.data
  //       f.name = getUUID()
  //       // await pushNewBlob(f)
  //       await pushNewImage(e, f)
  //     }
  //   }
  //   window.ws.onclose = function () {
  //     setConnectionFailed(true)
  //   }
  // }, [])

  function callSuccessToast(text) {
    // toast(text, {
    //   position: "top-right",
    //   autoClose: 6000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // })

    toast.success(text, {
      duration: 3000,
      position: 'top-right',
    });

  }

  function callErrorToast(text) {
    // toast.error(text, {
    //   position: "top-right",
    //   autoClose: 7000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // })
    toast.error(text, {
      duration: 8000,
      position: 'top-right',
    });
  }

  async function pushNewImage(e, f) {
    let reader = new FileReader()
    reader.onload = async function (e) {
      // console.log("WRITING IMAGES")
      // push new images to list and show in UI
      let image = { item: <img docId={selectedTabDocId} name={f.name} height="200" width="auto" src={e.target.result} onClick={() => scannedImgClick(f.name)} /> }
      scannedImages.push(image)
      console.log("IMGLIST", scannedImages)
      let newId = getUUID()
      setUpdateState(newId)
    }
    reader.readAsDataURL(f)
  }
  async function pushNewBlob(f) {
    // console.log("WRITING BLOBS")
    var blobToBase64 = function (f, cb) {
      let reader = new FileReader()
      reader.onload = function () {
        // converts blob to base64
        var dataUrl = reader.result
        var base64 = dataUrl.split(",")[1]
        cb(base64)
      }
      reader.readAsDataURL(f)
    }
    blobToBase64(f, async function (base64) {
      // encode blobs to send to socket
      let newBlob = { "docId": selectedTabDocId, "name": f.name, "blob": base64, "size": f.size }
      scannedBlobs.push(newBlob)
      console.log("BLOBS", scannedBlobs)
    })
  }
  // Handler of scanner buttons
  function scannerButtonClick(name) {
    if (name === "scanImage") {
      if (scannedImages.length >= 7) {
        swal({
          text: "Внимание, не сканируйте больше 7 документов за раз, сохранение может вызвать потерю сканированных файлов!",
          icon: "warning"
        })
        window.ws.send("1100")
      }
      else {
        console.log("SCAN", selectedTabDocId)
        window.ws.send("1100")
      }
    }
    else if (name === "saveDocument") {
      if (Object.keys(scannedBlobs).length === 0) {
        swal({
          text: "Нет файлов для сохранения!",
          icon: "warning"
        })
      }
      else {
        let blobsToBeSaved = []
        for (let k = 0; k < scannedBlobs.length; k++) {
          if (scannedBlobs[k].docId === selectedTabDocId) {
            blobsToBeSaved.push(scannedBlobs[k])
          }
        }
        console.log("BLOBS TO SAVE", blobsToBeSaved)
        deleteSavedImages()
        sendFieldValues({ commandType: "saveImages", path: selectedTabDocId, blobs: blobsToBeSaved, docId: selectedTabDocId, session_id: session_id })
        swal({
          text: "Процесс сохранения запущен, это займет некоторое время, дождитесь уведомления системы!",
          icon: "success"
        })
      }
    }
    else if (name === "loadPreviouslyScannedImages") {
      console.log("LOAD", selectedTabDocId)
      loadedImages = []
      sendFieldValues({ commandType: "loadPreviouslyScannedImages", path: selectedTabDocId, session_id: session_id, docId: selectedTabDocId })
      setShowLoading(true)
    }
  }
  function deleteSavedImages() {
    // console.log("DELETE", name)
    let newList = []
    let newBlobs = []
    for (let l = 0; l < scannedImages.length; l++) {
      if (scannedImages[l].item.props.docId === selectedTabDocId) {
        console.log("DELETE", scannedImages[l].item.props.docId)
      }
      else {
        newList.push(scannedImages[l])
      }
    }
    for (let k = 0; k < scannedBlobs.length; k++) {
      if (scannedBlobs[k].docId === selectedTabDocId) {
        console.log("DELETE", scannedBlobs[k].docId, selectedTabDocId)
      }
      else {
        newBlobs.push(scannedBlobs[k])
      }
    }
    scannedBlobs = newBlobs
    scannedImages = newList
    let newId = getUUID()
    setUpdateState(newId)
  }
  function deleteScannedImage(item) {
    // console.log("DELETE", item.props.name)
    let newList = []
    let newBlobs = []
    for (let l = 0; l < scannedImages.length; l++) {
      if (scannedImages[l].item.props.name === item.props.name) {
        console.log("DELETE", scannedImages[l].item.props.name, item.props.name)
        loadedImages.push(scannedImages[l])
      }
      else {
        newList.push(scannedImages[l])
      }
    }
    for (let k = 0; k < scannedBlobs.length; k++) {
      if (scannedBlobs[k].name === item.props.name) {
        console.log("DELETE", scannedBlobs[k].name, item.props.name)
      }
      else {
        newBlobs.push(scannedBlobs[k])
      }
    }
    scannedBlobs = newBlobs
    scannedImages = newList
    let newId = getUUID()
    setUpdateState(newId)
  }
  function deleteLoadedImage(item) {
    // console.log("DELETE", item.props.name)
    swal({
      text: "Вы уверены что хотите удалить этот скан?",
      icon: "warning",
      buttons: { yes: "Да", no: "Отмена" }
    })
      .then((click) => {
        if (click === "yes") {
          let newList = []
          for (let l = 0; l < loadedImages.length; l++) {
            if (loadedImages[l].item.props.name === item.props.name) {
              console.log("DELETE", loadedImages[l].item.props.name, item.props.name)
              sendFieldValues({ commandType: "deleteScannedImage", path: selectedTabDocId, session_id: session_id, fileName: loadedImages[l].item.props.name + ".png" })
            }
            else {
              newList.push(loadedImages[l])
            }
          }
          loadedImages = newList
          let newId = getUUID()
          setUpdateState(newId)
        }
      })

  }
  function returnImageList() {
    var imgs = []
    for (let l = 0; l < scannedImages.length; l++) {
      if (scannedImages[l].item.props.docId === selectedTabDocId) {
        imgs.push(
          <TableBody>
            <TableRow>
              <TableCell>
                {scannedImages[l].item}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <IconButton onClick={() => deleteScannedImage(scannedImages[l].item)}>
                  <DeleteForeverIcon fontSize="Large" style={{ color: "black", margin: 0 }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        )
      }
    }
    if (Object.keys(imgs).length !== 0) {
      return (
        <Grid container direction="row" justify="center" alignItems="flex-start">
          {imgs}
        </Grid>
      )
    }
  }
  function returnLoadedImageList() {
    var imgs = []
    for (let l = 0; l < loadedImages.length; l++) {
      if (loadedImages[l].item.props.docId === selectedTabDocId) {
        imgs.push(
          <TableBody>
            <TableRow>
              <TableCell>
                {loadedImages[l].item}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <IconButton onClick={() => deleteLoadedImage(loadedImages[l].item)}>
                  <DeleteForeverIcon fontSize="Large" style={{ color: "black", margin: 0 }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        )
      }
    }
    if (Object.keys(imgs).length !== 0) {
      return (
        <Grid container direction="row" justify="center" alignItems="flex-start">
          {imgs}
        </Grid>
      )
    }
  }
  function scannedImgClick(name) {
    for (let l = 0; l < scannedImages.length; l++) {
      if (scannedImages[l].item.props.name === name) {
        console.log("IMG", scannedImages[l])
        selectedImg = {
          name: scannedImages[l].item.props.name,
          height: "750",
          width: "auto",
          src: scannedImages[l].item.props.src
        }
      }
    }
    handleOpenModal()
    let newId = getUUID()
    setUpdateState(newId)
  }
  function loadedImgClick(name) {
    for (let l = 0; l < loadedImages.length; l++) {
      if (loadedImages[l].item.props.name === name) {
        console.log("IMG", loadedImages[l])
        selectedImg = {
          name: loadedImages[l].item.props.name,
          height: "750",
          width: "auto",
          src: loadedImages[l].item.props.src
        }
      }
    }
    handleOpenModal()
    let newId = getUUID()
    setUpdateState(newId)
  }
  function showScanComponentClick() {
    setShowScanComponent(true)
  }
  if (connectionFailed === true && showScanComponent === true && warningShowed === false) {
    setWarningShowed(true)
    swal({
      text: "Программа для сканирования не найдена на вашем компьютере. Пожалуйста, скачайте, установите и запустите программу, затем обновите страницу",
      icon: "warning"
    })
  }
  const uploadFile = e => {
    console.log("UPLOAD", e.target.files[0])
    let nameId = getUUID()
    let imgUrl = URL.createObjectURL(e.target.files[0])
    let image = { item: <img docId={selectedTabDocId} name={nameId} height="200" width="auto" src={imgUrl} onClick={() => scannedImgClick(nameId)} /> }
    fetch(imgUrl)
      .then(res => res.blob())
      .then(blob => {
        let f = blob
        f.name = nameId
        pushNewBlob(f)
        // console.log("BL", f)
      })
    scannedImages.push(image)
    setUpdateState(nameId)
  }
  // End of Document scanner functions

  function handleCloseCurrentTab(tabId) {
    // await setSelectedTab(tabId)
    var selectedTabData = tabData.get(tabId)
    if (selectedTabData !== undefined) {
      var commandJson =
      {
        commandType: "completeTask",
        session_id: selectedTabData.session_id,
        process_id: selectedTabData.process_id,
        taskID: selectedTabData.taskID,
        variables: {
          userAction: { value: "cancel" },
          userId: { value: userId },
          userRole: { value: userRole }
        }
      }
      if (userRole === "Администратор") {
        sendFieldValues(commandJson)
        closeTab(tabId)
      }
      else {
        if (selectedTabData.taskType === "showRegSearchForm" ||
          selectedTabData.taskType === "showDetailedSearchForm" ||
          selectedTabData.taskType === "showIPRSearchForm" ||
          selectedTabData.taskType === "showChildRegSearchForm" ||
          selectedTabData.taskType === "showChildDetailedSearchForm" ||
          selectedTabData.taskType === "showChildIPRSearchForm" ||
          selectedTabData.taskType === "searchChildDetailedForm" ||
          selectedTabData.taskType === "searchAdultsDetailedForm" ||
          selectedTabData.taskType === "showSearchUser" ||
          selectedTabData.taskType === "showSearchAppealsForm" ||
          selectedTabData.taskType === "showSearchComplaintsForm" ||
          selectedTabData.taskType === "error") {
          sendFieldValues(commandJson)
          closeTab(tabId)
        }
        else if (selectedTabData.taskType === "showRegForm" && selectedTabData.formType === "view") {
          sendFieldValues(commandJson)
          closeTab(tabId)
        }
        else if (selectedTabData.taskType === "showPersonForm" && selectedTabData.selectedDoc === null) {
          sendFieldValues(commandJson)
          closeTab(tabId)
        }
        else handleOpenSwal("Вы действительно хотите закрыть вкладку?", { yes: "Да", no: "Нет" }, tabId)
      }

    }
  }
  // Custom allert component
  function handleOpenSwal(text, swalButtons, tabId) {
    return (
      swal({
        text: text,
        icon: "warning",
        buttons: swalButtons
      })
        .then((click) => {
          if (click === "yes") {
            console.log("CLICK", click)
            handleCloseCurrentTabModal(tabId)
          } else {
            console.log("CLICK", click)
          }
        })
    )
  }
  // Close current tab from opened alert component
  function handleCloseCurrentTabModal(tabId) {
    var selectedTabData = tabData.get(tabId)
    var commandJson =
    {
      commandType: "completeTask",
      session_id: selectedTabData.session_id,
      process_id: selectedTabData.process_id,
      taskID: selectedTabData.taskID,
      variables: {
        userAction: { value: "cancel" },
        userId: { value: userId },
        userRole: { value: userRole }
      }
    }
    // if(selectedTabData.taskType === "showDetailedForm" && selectedTabData.docListIPR.length === 0){
    //   // handleModalClose()
    //   handleOpenSwal("Необходимо создать ИПР!", {ok: "Ок"})
    // } 
    // else if(selectedTabData.taskType === "showDetailedForm" && selectedTabData.docListIPR === "null" && selectedTabData.formType === "view"){
    //   // handleModalClose()
    //   handleOpenSwal("Необходимо создать ИПР!", {ok: "Ок"})
    // } 
    // else if(selectedTabData.taskType === "showIPRForm" && selectedTabData.userAction === "ipr" && selectedTabData.formType === "edit"){
    //   // handleModalClose()
    //   handleOpenSwal("Необходимо создать ИПР!", {ok: "Ок"})
    // } 
    // else {
    sendFieldValues(commandJson)
    // handleModalClose()
    closeTab(tabId)
    // }
    // else if(selectedTabData.taskType === "showDetailedForm" && selectedTabData.formType === "view"){
    //   alert("")
    // } 
  }
  function sendFieldValues(commandJson) {
    console.log("commandJson", commandJson)
    if (socket.readyState === socket.OPEN) {
      if(commandJson.process_id !== null){
        clearTabData(commandJson.process_id)
      }
      if (commandJson.variables !== undefined) {
        if (commandJson.variables["userAction"]["value"] === "cancel") {
          closeTab(selectedTab)
          socket.send(JSON.stringify(commandJson))
        }
        else if (commandJson.variables["authorization"] !== undefined) {
          commandJson.variables["authorization"]["value"] = "Bearer " + keycloak.token
          socket.send(JSON.stringify(commandJson))
          console.log("HOME AUTH", commandJson)
        }
        else {
          socket.send(JSON.stringify(commandJson))
          console.log("HOME SEND", commandJson)
        }
      }
      else {
        socket.send(JSON.stringify(commandJson))
        console.log("HOME SEND", commandJson)
      }
    }
    else {
      // alert("Проблема с соединением повторная попытка...")
      setSocket(null)
    }
    setCurrTaskId("")
  }
  // wrap up menu items
  function handleOpenMenuClick(name) {
    // console.log("Event", name)
    for (var i = 0; i < menuItemStates.length; i++) {
      if (menuItemStates[i].name === name) {
        if (menuItemStates[i].state === true) {
          menuItemStates[i].state = false
        }
        else {
          menuItemStates[i].state = true
        }
      }
    }
    setOpennav(!opennav)
  }
  // launch process related to menu button
  function handleMenuButtonClick(button) {
    console.log("Menu button clicked", button)
    if (button.name === "ClearEnumData" || button.name === "Redeploy") {
      const commandJson =
      {
        commandType: button.commandType,
        userRole: userRole,
        userId: userId,
        process_id: null
      }
      sendFieldValues(commandJson)
    }
    else {
      // console.log("ROLE", userRole)
      if (tabs.length >= 1 && userRole === !"Администратор") {
        callErrorToast("Закройте текущую вкладку чтобы запустить новый процесс!")
      }
      else {
        var process_id = getUUID()
        let updatedTabs = tabs.slice()
        updatedTabs.push({ id: process_id, name: process_id, label: button.parentLabel + " " + tabCounter })
        setTabs(updatedTabs)
        setSelectedTab(process_id)

        const commandJson =
        {
          commandType: button.commandType,
          processKey: button.processKey,
          process_id: process_id,
          session_id: session_id,
          process_id: null,
          variables: {
            user_session_id: { value: session_id },
            process_id: { value: process_id },
            userAction: { value: "findDocument" },
            docDef: { value: button.docDef },
            userId: { value: userId },
            userRole: { value: userRole },
            tabLabel: { value: button.parentLabel },
            authorization: { value: "Bearer " + keycloak.token },
          }
        }
        sendFieldValues(commandJson)
        console.log("Menu Button ", commandJson)
        setTabCounter(tabCounter + 1)
      }
    }
  }
  function getUUID() {
    const uuidv1 = require("uuid/v1")
    return uuidv1()
  }
  async function handleTabChange(event, newValue) {
    setSelectedTab(newValue)
    setShowScanComponent(false)
    console.log("TAB CHANGE", newValue)
  }
  function clearTabData(process_id) {
    tabData.remove(process_id)
    setCurrTaskId("")
    console.log("Clearing TabData", tabData, "ID", process_id)
  }
  // close selected tab clear it"s data from cache & change tab counter
  function closeTab(process_id) {
    if (process_id !== undefined) {
      console.log("Closing TAB", process_id)
      let updatedTabs = tabs.slice()
      for (var i = 0; i < updatedTabs.length; i++) {
        if (updatedTabs[i].id === process_id) {
          // console.log("INDEX", i)
          updatedTabs.splice(i, 1)
        }
      }
      if (updatedTabs[0] === undefined) {
        setSelectedTab(null)
        setTabCounter(1)
      }
      else setSelectedTab(updatedTabs[0].id)
      setTabs(updatedTabs)
    }
    // console.log("Closing TAB", process_id)
    let updatedTabs = tabs.slice()
    for (i = 0; i < updatedTabs.length; i++) {
      if (updatedTabs[i].id === process_id) {
        // console.log("INDEX", i)
        updatedTabs.splice(i, 1)
      }
    }
    if (Object.keys(updatedTabs).length === 0) {
      setSelectedTab(null)
      setTabCounter(1)
    }
    else {
      setSelectedTab(updatedTabs[0].id)
      setTabs(updatedTabs)
    }
  }
  // Creating Menu Levels 1-3
  function getLevel1Items(level1, index) {
    // console.log("Creating Menu menuItemStates", menuItemStates)
    if (level1.level2 === undefined) {
      if (level1.name === "ClearEnumData") {
        if (userId === "dced7bea-8a93-4baf-964b-232e75a758c5") {
          return (
            <ListItem button
              className={classesnav.level1}
              onClick={() => handleMenuButtonClick(level1)}
            >
              <ExitToAppIcon />
              <div className={classesnav.listItemText}>{openDrawer === true ? level1.label : ""}</div>
            </ListItem>
          )
        }
      }
      else {
        return (
          <ListItem button
            className={classesnav.level1}
            onClick={() => handleMenuButtonClick(level1)}
          >
            <ExitToAppIcon />
            <div className={classesnav.listItemText}>{openDrawer === true ? level1.label : ""}</div>
          </ListItem>
        )
      }

    }
    else {
      for (var i = 0; i < menuItemStates.length; i++) {
        if (menuItemStates[i].name === level1.name) {
          return (
            <List>
              <ListItem button
                className={classesnav.level1}
                onClick={() => handleOpenMenuClick(level1.name)}
              >
                <AddCircleIcon style={{ height: 20, width: 20 }} />
                <div className={classesnav.listItemText} style={{ "fontWeight": "bold" }}>{openDrawer === true ? level1.label : ""}</div>
                {(menuItemStates[i].state === true) ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={menuItemStates[i].state} timeout="auto" unmountOnExit>
                {level1.level2.map((level2Item, index) =>
                  getLevel2Items(level2Item, index)
                )}
              </Collapse>
            </List>
          )
        }
      }
    }
  }
  function getLevel2Items(level2, index) {
    // console.log("Level2", level2)
    if (level2.level3 === undefined) {
      return (
        <ListItem button
          className={classesnav.level2}
          onClick={() => handleMenuButtonClick(level2)}
        >
          <ExitToAppIcon style={{ height: 20 }} />
          <div className={classesnav.listItemText}>{openDrawer === true ? level2.label : ""}</div>
        </ListItem>
      )
    }
    else {
      for (var i = 0; i < menuItemStates.length; i++) {
        if (menuItemStates[i].name === level2.name) {
          return (
            <List component="div" disablePadding>
              <ListItem button
                className={classesnav.level2}
                onClick={() => handleOpenMenuClick(level2.name)}
              >
                <AddCircleIcon style={{ height: 20 }} />
                <div className={classesnav.listItemText} style={{ "fontWeight": "bold" }}>{openDrawer === true ? level2.label : ""}</div>
                {(menuItemStates[i].state === true) ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={menuItemStates[i].state} timeout="auto" unmountOnExit>
                {level2.level3.map((level3Item, index) =>
                  getLevel3Items(level3Item, index)
                )}
              </Collapse>
            </List>
          )
        }
      }
    }
  }
  function getLevel3Items(level3, index) {
    return (
      <ListItem button
        className={classesnav.level3}
        onClick={() => handleMenuButtonClick(level3)}
      >
        <ExitToAppIcon style={{ height: 20 }} />
        <div className={classesnav.listItemText}>{openDrawer === true ? level3.label : ""}</div>
      </ListItem>
    )
  }
  // Getting authenticated user profile
  if (userId === null) {
    keycloak.loadUserProfile().success(function (profile) {
      let curUserId = profile.attributes.userId[0]
      let curOrganizationId = profile.attributes.organizationId[0]
      let curUserRole = profile.attributes.userRole[0]
      let curUserFirstName = profile.firstName
      let curUserLastName = profile.lastName
      let curUserName = curUserFirstName + " " + curUserLastName.substring(0, 1) + "."
      let curUserFullName = curUserFirstName + " " + curUserLastName
      setUserId(curUserId)
      setOrganizationId(curOrganizationId)
      setUserRole(curUserRole)
      setUserName(curUserName)
      setUserFullName(curUserFullName)
      setSignDocument(profile.attributes.signDocument !== undefined ? profile.attributes.signDocument[0] : false)
      setChangeStatus(profile.attributes.changeStatus !== undefined ? profile.attributes.changeStatus[0] : false)
      console.log("PROFILE: ", profile)
    }).error(function () {
      console.log("Failed to load user profile")
    })
  }
  if (menuItemStates.length === 0) {
    return (
      <div align="center" style={{ paddingTop: 20 }}>
        <CircularProgress />
        <div>loading...</div>
      </div>
    )
  }
  // if (userId === null) return <div>No user</div>
  // console.log("Home", selectedTab)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            ИСМСЭК
          </Typography>
          <td style={{ paddingRight: 15 }}>
            <Badge badgeContent={childList} color={childList > 0 ? "secondary" : "primary"}>
              <Notification
                style={{ cursor: "pointer" }}
                fontSize="large"
                // color={urgentUnreadInstructions === true ? "secondary" : "white"}
                onClick={() => handleMenuButtonClick({ commandType: "launchProcess", processKey: "process_987bfe07-fffb-4e1f-9edd-731f53be09b1", parentLabel: "Мед акты(Дт)" })}
              />
            </Badge>
          </td>
          <AccountCircleIcon fontSize="large" />
          {!!keycloak.authenticated && (
            <table>
              <tbody>
                <tr>
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ fontSize: 12 }}>ФИО:</td>
                          <td style={{ fontSize: 12 }}>{userName}</td>
                        </tr>
                        <tr>
                          <td style={{ fontSize: 12 }}>Роль:</td>
                          <td style={{ fontSize: 12 }}>{userRole}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <Typography>
                      <IconButton color="inherit" style={{ fontSize: 14 }} onClick={() => keycloak.logout()}>
                        Выйти
                      </IconButton>
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
            // <Typography>
            //   {userName}
            //   <IconButton color="inherit" style={{ fontSize: 14 }} onClick={() => keycloak.logout()}>
            //     Выйти
            //   </IconButton>
            // </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {routes.map((level1, index) => (
          getLevel1Items(level1, index)
        ))}
      </Drawer>
      <main className={classes.content}>
        <a name="top" />
        {/* <div className={classes.appBarSpacer} /> */}
        <Grid style={{ paddingLeft: (openDrawer === true) ? drawerWidth : 65 }}>
          <AppBar color="default" style={{ paddingLeft: (openDrawer === true) ? drawerWidth : 65 }}>
            {/* <Tabs
              position="fixed"
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            > */}
            <Tabs
                key={currTaskId}
                style={{ height: "110px", paddingTop: "60px" }}
                position="fixed"
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
              {tabs.map((tab, index) => (
                <Tab
                  key={tab.id}
                  label={<div style={{ fontSize: 11 }}>{tab.label}<IconButton onClick={() => handleCloseCurrentTab(tab.id)}>
                    <CloseIcon style={{ fontSize: "medium", color: "black" }} />
                  </IconButton></div>}
                  value={tab.id}
                  {...a11yProps(tab.id)}
                >
                </Tab>
              ))}
            </Tabs>
          </AppBar>

          {webSocketMessage !== null &&
            tabs.map((tab, index) => (
              <TabPanel
                position="fixed"
                currentTab={tab.id}
                selectedTab={selectedTab}
                key={tab.id}
                style={{ paddingTop: 95, paddingLeft: 7 }}
              >
                <ComponentManager
                  ismseApi={ismseApi}
                  userId={userId}
                  organizationId={organizationId}
                  userRole={userRole}
                  userName={userName}
                  userFullName={userFullName}
                  signDocument={signDocument}
                  changeStatus={changeStatus}
                  selectedTab={selectedTab}
                  showScanComponent={showScanComponent}
                  id={tab.id}
                  key={tab.id}
                  adminMessage={tabData.get(tab.id)}
                  sendFieldValues={sendFieldValues}
                  handleCloseCurrentTab={handleCloseCurrentTab}
                  clearTabData={clearTabData}
                  showScanComponentClick={showScanComponentClick}
                  callSuccessToast={callSuccessToast}
                  callErrorToast={callErrorToast}
                // closeTab = {closeTab}
                />
              </TabPanel>
            ))
          }
          {showScanComponent === true &&
            <div id="scanner" style={{ paddingLeft: 40, paddingBottom: 40, paddingRight: 40 }}>
              {connectionFailed === false &&
                <Button
                  id="1234"
                  variant="outlined"
                  onClick={() => scannerButtonClick("scanImage")}
                  style={{
                    margin: 3,
                    backgroundColor: "#D3D3FE"
                  }}
                  startIcon={<ScannerIcon />}
                >Сканировать
                </Button>
              }
              {connectionFailed === true &&
                <Button
                  component="a"
                  href="../Scan_App_SetUp.msi"
                  download
                  variant="outlined"
                  style={{
                    margin: 3,
                    backgroundColor: "#D3D3FE"
                  }}
                  startIcon={<GetAppIcon />}
                >Скачать
                </Button>
              }
              <Button
                variant="outlined"
                onClick={() => scannerButtonClick("saveDocument")}
                style={{
                  margin: 3,
                  backgroundColor: "#D1FBD1"
                }}
                startIcon={<SaveIcon />}
              >Сохранить
              </Button>
              <Button
                variant="outlined"
                onClick={() => scannerButtonClick("loadPreviouslyScannedImages")}
                style={{
                  margin: 3,
                  backgroundColor: "#D1FBD1"
                }}
                startIcon={<CloudDownloadIcon />}
              >Загрузить ранее отсканированные
              </Button>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={uploadFile}
                style={{ display: "none" }}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="outlined"
                  // color="primary" 
                  component="span"
                  startIcon={<SearchIcon />}
                  style={{
                    margin: 3,
                    backgroundColor: "#D1FBD1"
                  }}
                >Выбрать
                </Button>
              </label>

              <Table size="small">
                <TableHead style={{ backgroundColor: "#D3D3FE" }}>
                  <TableRow>
                    <TableCell>Отсканированные/загруженные файлы</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{returnImageList()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table size="small">
                <TableHead style={{ backgroundColor: "#D3D3FE" }}>
                  <TableRow>
                    <TableCell>Загруженные файлы</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{showLoading === true &&
                      <Grid container direction="row" justify="center" spacing={0}>
                        <Grid item xs={12}>
                          <Card>
                            <LinearProgress />
                          </Card>
                        </Grid>
                      </Grid>
                    }
                      {returnLoadedImageList()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Modal
                style={{ paddingLeft: "500px" }}
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div className={classes.imagePaper}>
                  <img name={selectedImg.name} height={selectedImg.height} width="auto" src={selectedImg.src} />
                </div>
              </Modal>
              <div>{showImage}</div>
            </div>
          }
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        {/* <ToastContainer /> */}
        <div><Toaster /></div>
        <IconButton href="#top" style={hrefStyleTop} className={classes.hrefStyleTop}>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton href="#bottom" style={hrefStyleBottom} className={classes.hrefStyleBottom}>
          <ArrowDownwardIcon />
        </IconButton>
        <a name="bottom" />
      </main>
    </div >
  );
};
