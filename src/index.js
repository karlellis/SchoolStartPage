import React from "react";
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
import { ReactComponent as GearIcon } from "./srcimg/gear.svg";
const bcrypt = require("bcryptjs")

var fileImg = null;
var temp = "";
var temp2 = "";
var temp3 = "";
var tempColor = "";
var tempAppTitle = "";
var tempAppLink = "";
var tempIcon = "";
var arrayLength = 0;
var login = false;
var array = [];
var arrayAdd = [];
var inPos = 0;
var newItem = {
  "title": "",
  "link": "",
  "icon": ""
};
var flag = "";
var nome = "";

// initData not really necessary...
var spData = require("./initData.json");
var headTitle = spData.headTitle;
var headSubtitle = spData.headSubtitle;
var headSubtitleLink = spData.headSubtitleLink;
var headColor = spData.headColor;
var footTitle = spData.footTitle;
var footSubtitle = spData.footSubtitle;
var footSubtitle2 = spData.footSubtitle2;
var footInfoColor = spData.footInfoColor;
var footCreditiTitle = spData.footCreditiTitle;
var footCreditiSubtitle = spData.footCreditiSubtitle;
var footCreditiSubtitle2 = spData.footCreditiSubtitle2;
var footCreditColor = spData.footCreditColor;
var clockColor = spData.clockColor;
// var user = spData.user;
// var password = spData.password;

// const sleep = (milliseconds) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

const Conferma = ({ alShow, children }) => {
  const showHideClassName = alShow ? "display-block" : "display-none";
  return (
    <div className={showHideClassName}>
      {children}
    </div>
  );
};

const Upload = ({ upShow, children }) => {
  const showHideClassName = upShow ? "display-block" : "display-none";
  return (
    <div className={showHideClassName}>
      {children}
    </div>
  );
};

const Errore = ({ alErrShow, children }) => {
  const showHideClassName = alErrShow ? "display-block" : "display-none";
  return (
    <div className={showHideClassName}>
      {children}
    </div>
  );
};

const TitleDialog = ({ handleSave, handleClose, titleDiaShow, children }) => {
  const showHideClassName = titleDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Salva</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Chiudi</button>
        </div>
      </section>
    </div>
  );
};

const InfoDialog = ({ handleSave, handleClose, infoDiaShow, children }) => {
  const showHideClassName = infoDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Salva</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Chiudi</button>
        </div>
      </section>
    </div>
  );
};

const AppEditDialog = ({ handleSave, handleClose, appEditDiaShow, children }) => {
  const showHideClassName = appEditDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Salva</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Chiudi</button>
        </div>
      </section>
    </div>
  );
};

const AppDelDialog = ({ handleSave, handleClose, appDelDiaShow, children }) => {
  const showHideClassName = appDelDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Rimuovi</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Chiudi</button>
        </div>
      </section>
    </div>
  );
};

const AppAddDialog = ({ handleSave, handleClose, appAddDiaShow, children }) => {
  const showHideClassName = appAddDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Aggiungi</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Chiudi</button>
        </div>
      </section>
    </div>
  );
};

const CreditDialog = ({ handleSave, handleClose, creditDiaShow, children }) => {
  const showHideClassName = creditDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Salva</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Chiudi</button>
        </div>
      </section>
    </div>
  );
};

const LoginEditDialog = ({ handleEditLogin, handleClose, loginEditDiaShow, children }) => {
  const showHideClassName = loginEditDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleEditLogin}>Salva</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Chiudi</button>
        </div>
      </section>
    </div>
  );
};

const LogoDialog = ({ handleUpload, handleClose, logoDiaShow, children }) => {
  const showHideClassName = logoDiaShow ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleUpload}>Upload</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Chiudi</button>
        </div>
      </section>
    </div>
  );
};

const LoginDialog = ({ handleLogin, handleClose, loginDiaShow, children }) => {
  const showHideClassName = loginDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleLogin}>Accedi</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Chiudi</button>
        </div>
      </section>
    </div>
  );
};

async function fetchUpPHP(file, url, key) {
  var data = new FormData()
  data.append(key, file)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': '*/*'
    },
    body: data
  }).then((response) => response.json())
    .then((json) => {
      nome = json.filename;
      console.log("Image Upload:", nome);
      flag = json.status;
    });
}

async function fetchUpConfig(file, url, key) {
  var data = new FormData()
  data.append(key, JSON.stringify(file))
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': '*/*'
    },
    body: data
  }).then((response) => response.json())
    .then((json) => {
      console.log(json.status);
    });
}

async function fetchDelPHP(appIcon, url, key) {
  var data = new FormData()
  data.append(key, appIcon)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': '*/*'
    },
    body: data
  }).then((response) => response.json())
    .then((json) => {
      console.log(json.status);
    });
}

async function hashPassword(plaintextPassword) {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash;
}

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headShow: spData.headShow,
      footShow: spData.footShow,
      mainBtn: spData.mainBtn,
      appsBtnShow: spData.appsBtnShow,
      appItems: [],
      titleDiaShow: false,
      logoDiaShow: false,
      loginDiaShow: false,
      creditDiaShow: false,
      loginEditDiaShow: false,
      infoDiaShow: false,
      appEditDiaShow: false,
      appDelDiaShow: false,
      appAddDiaShow: false,
      alShow: false,
      alErrShow: false,
      upShow: false
    }
    this.appEditDel = this.appEditDel.bind(this)
    this.appAddItem = this.appAddItem.bind(this)
    this.toggleHeadShow = this.toggleHeadShow.bind(this);
    this.toggleFootShow = this.toggleFootShow.bind(this);
    this.showMainButtons = this.showMainButtons.bind(this);
    this.headLogoEdit = this.headLogoEdit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.loginSession = this.loginSession.bind(this);
    this.loginEditSession = this.loginEditSession.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.loginCheck = this.loginCheck.bind(this);
    this.loginEditCheck = this.loginEditCheck.bind(this);
  }

  componentDidMount() {
    fetch('./config/data.json').then(response => {
      response.json().then(settings => {
        spData = settings;
        this.setState({
          headShow: spData.headShow,
          footShow: spData.footShow,
          mainBtn: spData.mainBtn,
          appsBtnShow: spData.appsBtnShow,
          appItems: spData.appItems
        })
        headTitle = spData.headTitle
        headSubtitle = spData.headSubtitle;
        headSubtitleLink = spData.headSubtitleLink;
        footTitle = spData.footTitle;
        footSubtitle = spData.footSubtitle;
        footSubtitle2 = spData.footSubtitle2;
        footCreditiTitle = spData.footCreditiTitle;
        footCreditiSubtitle = spData.footCreditiSubtitle;
        footCreditiSubtitle2 = spData.footCreditiSubtitle2;
        // user = spData.user;
        // password = spData.password;
        // console.log("Check password: ", comparePassword("admin", password));
        // console.log("Hashed first password: ", hashPassword(password));
      })
    })
  }

  componentDidUpdate() {
    this.userInput.focus();
    this.userChangeInput.focus();
  }

  saveFile(file, url, key) {
    fetchUpConfig(file, url, key);
  }

  checkImageUpload(url, op) {
    if (flag === "") {
      console.log("Wait...")
      window.setTimeout(() => { this.checkImageUpload(url, op); }, 300);
    } else {
      console.log("Continue...")
      // sleep(1000).then(r => {
      flag = "";
      // var nome = fileImg.name;
      if (url === "logo" && op === "edit") {
        spData.LogoIcon = "./img/" + nome;
        this.setState({ upShow: false });
        this.setState({ alShow: true });
        this.setState({ alErrShow: false });
        console.log("File correctly Uploaded!");
      } else if (url === "icon" && op === "edit") {
        if (fileImg !== null) {
          console.log("Icon edit!");
          array[temp].icon = "./appicons/" + nome;
        }
        if (temp2 !== "") {
          array[temp].title = temp2;
        }
        if (temp3 !== "") {
          array[temp].link = temp3;
        }
        this.setState({ appItems: array });
        spData.appItems = array;
        temp = "";
        temp2 = "";
        temp3 = "";
        this.setState({ upShow: false });
        this.setState({ alShow: true });
        this.setState({ alErrShow: false });
        console.log("Edit Icon correctly Uploaded!");
      } else if (url === "icon" && op === "add") {
        newItem.icon = "./appicons/" + nome;
        newItem.title = temp2;
        newItem.link = temp3;
        tempIcon = "";
        arrayAdd = this.addAfter(array, inPos, newItem);
        console.log("Insert pos=", (inPos));
        this.setState({ appItems: arrayAdd });
        spData.appItems = arrayAdd;
        arrayAdd = [];
        temp = "";
        temp2 = "";
        temp3 = "";
        newItem = {
          "title": "",
          "link": "",
          "icon": ""
        };
        this.setState({ upShow: false });
        this.setState({ alShow: true });
        this.setState({ alErrShow: false });
        console.log("Add Icon correctly Uploaded!");
      } else if (url === "icon" && op === "addlast") {
        newItem.icon = "./appicons/" + nome;
        newItem.title = temp2;
        newItem.link = temp3;
        inPos = arrayLength;
        tempIcon = "";
        arrayAdd = this.addAfter(array, inPos, newItem);
        this.setState({ appItems: arrayAdd });
        spData.appItems = arrayAdd;
        arrayAdd = [];
        temp = "";
        temp2 = "";
        temp3 = "";
        newItem = {
          "title": "",
          "link": "",
          "icon": ""
        };
        this.setState({ upShow: false });
        this.setState({ alShow: true });
        this.setState({ alErrShow: false });
        console.log("Add Last Icon correctly Uploaded!");
      }
      fileImg = null;
      // })
    }
  }

  saveImgFile(file, url, op) {
    if (fileImg !== null) {
      // tempIcon = spData.LogoIcon;
      fetchDelPHP(tempIcon, "./api/img-upload.php", url);
      console.log("Image deleted=", tempIcon);
    }
    // sleep(1000).then(r => {
    tempIcon = "";
    this.setState({ alErrShow: false });
    this.setState({ upShow: true });
    this.setState({ alShow: false });
    fetchUpPHP(file, "./api/img-upload.php", url);
    this.checkImageUpload(url, op);
    // });
    // }
  }

  saveTitle = () => {
    if (temp !== "") {
      spData.headTitle = temp;
      headTitle = spData.headTitle;
      this.setState({ alShow: true });
      this.setState({ alErrShow: false });
    }
    else {
      this.setState({ alErrShow: true });
      this.setState({ alShow: false });
    }
    temp = "";
  }

  saveInfo = () => {
    if (temp !== "") {
      spData.footTitle = temp;
      footTitle = spData.footTitle;
    }
    if (temp2 !== "") {
      spData.footSubtitle = temp2;
      footSubtitle = spData.footSubtitle;
    }
    if (temp3 !== "") {
      spData.footSubtitle2 = temp3;
      footSubtitle2 = spData.footSubtitle2;
    }
    temp = "";
    temp2 = "";
    temp3 = "";
    this.setState({ alShow: true });
  }

  saveCredit = () => {
    if (temp !== "") {
      spData.footCreditiTitle = temp;
      footCreditiTitle = spData.footCreditiTitle;
    }
    if (temp2 !== "") {
      spData.footCreditiSubtitle = temp2;
      footCreditiSubtitle = spData.footCreditiSubtitle;
    }
    if (temp3 !== "") {
      spData.footCreditiSubtitle2 = temp3;
      footCreditiSubtitle2 = spData.footCreditiSubtitle2;
    }
    temp = "";
    temp2 = "";
    temp3 = "";
    this.setState({ alShow: true });
  }

  saveAppEdit = () => {
    array = [...this.state.appItems];
    if (fileImg !== null || temp2 !== "" || temp3 !== "") {
      this.saveImgFile(fileImg, "icon", "edit");
    }
  }

  applyAppDel = () => {
    var array = [...this.state.appItems];
    var index = temp;
    console.log("Index: ", temp);
    if (index !== -1) {
      fetchDelPHP(tempIcon, "./api/img-upload.php", "icon");
      tempIcon = "";
      array.splice(index, 1);
      this.setState({ appItems: array });
      spData.appItems = array;
    }
    temp = "";
    temp2 = "";
    temp3 = "";
    this.setState({ alShow: true });
  }

  addAfter(array, index, newItem) {
    return [
      ...array.slice(0, index),
      newItem,
      ...array.slice(index)
    ];
  }

  applyAppAdd = () => {
    array = [...this.state.appItems];
    if (fileImg !== null && temp2 !== "" && temp3 !== "") {
      if (temp !== "") {
        inPos = parseInt(temp) - 1;
        if (inPos < arrayLength) {
          this.saveImgFile(fileImg, "icon", "add");
        } else {
          this.setState({ alShow: false });
          this.setState({ alErrShow: true });
        }
      } else {
        this.saveImgFile(fileImg, "icon", "addlast");
      }
    } else {
      this.setState({ alShow: false });
      this.setState({ alErrShow: true });
    }
  }

  uploadCheck = () => {
    if (fileImg !== null) {
      // var nome = fileImg.name;
      tempIcon = spData.LogoIcon;
      this.saveImgFile(fileImg, "logo", "edit");
    }
  }

  loginSession(id) {
    if (login === false) {
      this.showModal("login");
      this.userInput.focus();
    } else {
      this.showMainButtons();
    }
  }

  loginEditSession(id) {
    this.showModal("loginEdit");
  }

  loginCheck = () => {
    comparePassword(temp2, spData.password)
      .then(pass => {
        comparePassword(temp, spData.user)
          .then(user => {
            // console.log(result)
            if (user && pass && login === false) {
              // if (temp === spData.user && result !== false && login === false) {
              login = true;
              temp = "";
              temp2 = "";
              this.showMainButtons();
              this.hideModal();
            } else {
              this.setState({ alShow: true });
              login = false;
              // console.log("CREDENZIALI ERRATE!!!");
            }
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  loginEditCheck = () => {
    if (temp !== "" || temp2 !== "") {
      // spData.user = temp;
      hashPassword(temp)
        .then(result => {
          // console.log(result)
          spData.user = result;
        })
        .catch(err => {
          console.log(err)
        })
      hashPassword(temp2)
        .then(result => {
          // console.log(result)
          spData.password = result;
        })
        .catch(err => {
          console.log(err)
        })
      // spData.password = temp2;
      temp = "";
      temp2 = "";
      this.setState({ alShow: true });
      this.setState({ alErrShow: false });
    } else {
      this.setState({ alShow: false });
      this.setState({ alErrShow: true });
    }
  }

  showModal(id) {
    if (id === "title") {
      this.setState({ titleDiaShow: true });
    } else if (id === "login") {
      this.setState({ loginDiaShow: true });
    } else if (id === "loginEdit") {
      this.setState({ loginEditDiaShow: true });
    } else if (id === "logo") {
      this.setState({ logoDiaShow: true });
    } else if (id === "info") {
      this.setState({ infoDiaShow: true });
    } else if (id === "credit") {
      this.setState({ creditDiaShow: true });
    } else if (id === "appEdit") {
      this.setState({ appEditDiaShow: true });
    } else if (id === "appDel") {
      this.setState({ appDelDiaShow: true });
    } else if (id === "appAdd") {
      this.setState({ appAddDiaShow: true });
    }
  };

  hideModal(id) {
    this.setState({ titleDiaShow: false });
    this.setState({ alShow: false });
    this.setState({ loginDiaShow: false });
    this.setState({ loginEditDiaShow: false });
    this.setState({ logoDiaShow: false });
    this.setState({ infoDiaShow: false });
    this.setState({ creditDiaShow: false });
    this.setState({ appEditDiaShow: false });
    this.setState({ appDelDiaShow: false });
    this.setState({ appAddDiaShow: false });
    this.setState({ alShow: false });
    this.setState({ alErrShow: false });
    document.getElementById('loginForm').reset();
    document.getElementById('loginEditForm').reset();
    document.getElementById('logoForm').reset();
    document.getElementById('infoForm').reset();
    document.getElementById('creditForm').reset();
    document.getElementById('appEditForm').reset();
    document.getElementById('appAddForm').reset();
  };

  hideAlert = () => {
    this.setState({ alShow: false });
  };

  appsButtonShow(id) {
    if (this.state.appsBtnShow !== id) {
      this.setState({
        appsBtnShow: id
      })
      this.setState(previousState => ({
        appItems: [...previousState.appItems, spData.appAdd]
      }));
    } else {
      this.setState({
        appsBtnShow: false
      })
      var array = [...this.state.appItems];
      array.pop();
      this.setState({ appItems: array });
    }
  }

  toggleHeadShow(id) {
    if (this.state.headShow !== id) {
      spData.headShow = id;
      this.setState({
        headShow: id
      })
    } else {
      spData.headShow = false;
      this.setState({
        headShow: false
      })
    }
  }

  showMainButtons(id) {
    if (this.state.mainBtn !== id) {
      this.setState({
        mainBtn: id
      })
    } else {
      this.setState({
        mainBtn: false
      })
      login = false;
      var array = [...this.state.appItems];
      if (this.state.appsBtnShow !== false) {
        this.setState({
          appsBtnShow: false
        })
        array.pop();
        this.setState({ appItems: array });
        spData.appItems = array;
      }
      spData.appItems = array;
      this.saveFile(spData, "./api/img-upload.php", "config");
      // window.location.reload();
    }
  }

  headLogoEdit(id) {
    this.showModal("logo");
  }

  headTitleEdit(id) {
    this.showModal("title");
    console.log("Title Edit Clicked:", id);
  }

  footCreditsEdit(id) {
    this.showModal("credit");
    console.log("Credits Edit Clicked:", id);
  }

  footInfoEdit(id) {
    this.showModal("info");
    console.log("Info Edit Clicked:", id);
  }

  appAddItem(id, pos) {
    array = [...this.state.appItems];
    arrayLength = (array.length - 1);
    this.showModal("appAdd");
    console.log("Adding IT!");
  }

  toggleFootShow(id) {
    if (this.state.footShow !== id) {
      this.setState({
        footShow: id
      })
      spData.footShow = id;
    } else {
      this.setState({
        footShow: false,
      })
      spData.footShow = false;
    }
  }

  appEditDel(id, pos) {
    temp = pos;
    array = [...this.state.appItems];
    tempAppTitle = array[pos].title;
    tempAppLink = array[pos].link;
    tempIcon = array[pos].icon;
    console.log(id, " for ", pos);
    if (id === "AppEdit") {
      this.showModal("appEdit");
    } else {
      this.showModal("appDel");
    }
  }

  render() {
    const { headShow: headShow } = this.state;
    const { footShow: footShow } = this.state;
    const { mainBtn: mainBtn } = this.state;
    let head = "";
    let buttons = "";
    let foot = "";

    if (headShow === "NoWatch" && mainBtn === false) {
      head = (
        <div className="row text-center mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* TITOLO */}
              <section id="HeadTitle" className="col solidblue latowhite d-flex justify-content-center 
              align-items-center ">
                <div>
                  <p className="medfont">{headTitle}</p>
                  <p className="smallfont" title={headSubtitle}>
                    <a href={headSubtitleLink}>
                      {headSubtitle}
                    </a>
                  </p>
                </div>
              </section>
              {/* LOGO */}
              <div id="HeadLogo" className="col-md logo blue d-flex justify-content-center align-items-center">
                <LogoImg />
              </div>
              {/* OROLOGIO */}
              {/* SETTINGS */}
              <div id="HeadSettings" className="col-md-1 indaco d-flex justify-content-center align-items-center">
                <SettingsGear handleShowButtons={this.loginSession} />
              </div>
            </div>
          </div>
        </div>
      )
    } else if (headShow === "NoWatch") {
      head = (
        <div className="row text-center mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* TITOLO */}
              <section id="HeadTitle" className="col solidblue latowhite d-flex flex-column justify-content-end align-items-center">
                <div>
                  <p className="medfont">{headTitle}</p>
                  <p className="smallfont" title={headSubtitle}>
                    <a href={headSubtitleLink}>
                      {headSubtitle}
                    </a>
                  </p>
                </div>

                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col flexbutton solidgreen m-1" onClick={() => this.headTitleEdit("TitleEdit")}>
                    Edit Title
                  </button>
                </div>
              </section>
              {/* LOGO */}
              <div id="HeadLogo" className="col-md logo blue d-flex flex-column justify-content-end align-items-center">
                <LogoImg />
                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col latowhite flexbutton solidgreen m-1" onClick={() => this.headLogoEdit("LogoEdit")}>
                    Edit Logo
                  </button>
                </div>
              </div>
              {/* OROLOGIO */}
              {/* SETTINGS */}
              <div id="HeadSettings" className="col-md-1 indaco d-flex flex-column justify-content-center align-items-center">
                {/* <div id="HeadSettings" className="col-md-1 indaco d-flex justify-content-center align-items-center"> */}
                <SettingsGear handleShowButtons={this.loginSession} />
                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col latowhite flexbutton solidgreen m-1" onClick={() => this.loginEditSession("LoginEdit")}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (headShow === "NoTitle") {
      head = (
        <div className="row text-center mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* TITOLO */}
              {/* LOGO */}
              {/* OROLOGIO */}
              <div id="HeadDate" className="col-md brick latowhite d-flex justify-content-center align-items-center">
                <Orologio></Orologio>
              </div>
              {/* SETTINGS */}
              <div id="HeadSettings" className="col-md-1 indaco d-flex flex-column justify-content-center align-items-center">
                {/* <div id="HeadSettings" className="col-md-1 indaco d-flex justify-content-center align-items-center"> */}
                <SettingsGear handleShowButtons={this.loginSession} />
                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col latowhite flexbutton solidgreen m-1" onClick={() => this.loginEditSession("LoginEdit")}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (mainBtn === false) {
      head = (
        <div className="row text-center mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* TITOLO */}
              <section id="HeadTitle" className="col solidblue latowhite d-flex justify-content-center align-items-center ">
                <div>
                  <p className="medfont">{headTitle}</p>
                  <p className="smallfont" title={headSubtitle}>
                    <a href={headSubtitleLink}>
                      {headSubtitle}
                    </a>
                  </p>
                </div>
              </section>
              {/* LOGO */}
              <div id="HeadLogo" className="col-md logo blue d-flex justify-content-center align-items-center">
                <LogoImg />
              </div>
              {/* OROLOGIO */}
              <div id="HeadDate" className="col-md brick latowhite d-flex justify-content-center align-items-center">
                <Orologio></Orologio>
              </div>
              {/* SETTINGS */}
              <div id="HeadSettings" className="col-md-1 indaco d-flex justify-content-center align-items-center">
                <SettingsGear handleShowButtons={this.loginSession} />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      head = (
        <div className="row text-center mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* TITOLO */}
              <section id="HeadTitle" className="col solidblue latowhite d-flex flex-column justify-content-end align-items-center">
                <div>
                  <p className="medfont">{headTitle}</p>
                  <p className="smallfont" title={headSubtitle}>
                    <a href={headSubtitleLink}>
                      {headSubtitle}
                    </a>
                  </p>
                </div>
                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col flexbutton solidgreen m-1" onClick={() => this.headTitleEdit("TitleEdit")}>
                    Edit Title
                  </button>
                </div>
              </section>
              {/* LOGO */}
              <div id="HeadLogo" className="col-md logo blue d-flex flex-column justify-content-end align-items-center">
                <LogoImg />
                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col latowhite flexbutton solidgreen m-1" onClick={() => this.headLogoEdit("LogoEdit")}>
                    Edit Logo
                  </button>
                </div>
              </div>
              {/* OROLOGIO */}
              <div id="HeadDate" className="col-md brick latowhite d-flex justify-content-center align-items-center">
                <Orologio></Orologio>
              </div>
              {/* SETTINGS */}
              <div id="HeadSettings" className="col-md-1 indaco d-flex flex-column justify-content-center align-items-center">
                {/* <div id="HeadSettings" className="col-md-1 indaco d-flex justify-content-center align-items-center"> */}
                <SettingsGear handleShowButtons={this.loginSession} />
                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col latowhite flexbutton solidgreen m-1" onClick={() => this.loginEditSession("LoginEdit")}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (mainBtn === false) {
      buttons = ""
    } else {
      buttons = (
        <>
          <div className="row">
            <button className="col button solidgreen m-1"
              onClick={() => this.toggleHeadShow("NoWatch")}>
              Toggle Head
            </button>
            <button className="col button solidblue m-1"
              onClick={() => {
                if (footShow === false) {
                  this.toggleFootShow("NoCredits");
                } else if (footShow === "NoCredits") {
                  this.toggleFootShow("NoInfo");
                } else if (footShow === "NoInfo") {
                  this.toggleFootShow("NoFooter");
                } else if (footShow === "NoFooter") {
                  this.toggleFootShow(false);
                }
              }}>
              Toggle Foot
            </button>
            <button className="col button solidindaco m-1"
              onClick={() => this.appsButtonShow("ShowAppBtn")}>
              App Settings
            </button>
          </div>
        </>
      )
    }

    if (footShow === "NoFooter") {
      foot = ""
    } else if (footShow === "NoInfo" && mainBtn === false) {
      foot = (
        <div className="row mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* INFO */}
              {/* CREDITI */}
              <section className="col pt-1 crediti solidgreen latowhite d-flex justify-content-center align-items-center text-center ">
                <div>
                  <a className="smallfont">{footCreditiTitle}</a>
                  <br />
                  <a className="smallfont"><i>{footCreditiSubtitle}</i></a>
                  <br />
                  <a className="verysmallfont">{footCreditiSubtitle2}</a>
                </div>
              </section>
            </div>
          </div>
        </div>
      )
    } else if (footShow === "NoInfo" && mainBtn !== false) {
      foot = (
        <div className="row mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* INFO */}
              {/* CREDITI */}
              <section className="col solidgreen crediti latowhite d-flex flex-column justify-content-end align-items-center text-center ">
                <div>
                  <a className="smallfont">{footCreditiTitle}</a>
                  <br />
                  <a className="smallfont"><i>{footCreditiSubtitle}</i></a>
                  <br />
                  <a className="verysmallfont">{footCreditiSubtitle2}</a>
                </div>
                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col flexbutton brick m-1" onClick={() => this.footCreditsEdit("CreditsEdit")}>
                    Edit Credits
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )
    } else if (footShow === "NoCredits" && mainBtn === false) {
      foot = (
        <div className="row mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* INFO */}
              <section className="col blue pb-1 latowhite d-flex justify-content-center align-items-center text-center ">
                <div>
                  <a className="medfont">{footTitle}</a>
                  <br />
                  <a className="smallfont">{footSubtitle}</a>
                  <br />
                  <a className="smallfont">{footSubtitle2}</a>
                </div>
              </section>
              {/* CREDITI */}
            </div>
          </div>
        </div>
      )
    } else if (footShow === "NoCredits" && mainBtn !== false) {
      foot = (
        <div className="row mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* INFO */}
              <section className="col blue latowhite d-flex flex-column justify-content-end align-items-center text-center ">
                <div>
                  <a className="medfont">{footTitle}</a>
                  <br />
                  <a className="smallfont">{footSubtitle}</a>
                  <br />
                  <a className="smallfont">{footSubtitle2}</a>
                </div>
                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col flexbutton solidgreen m-1" onClick={() => this.footInfoEdit("InfoEdit")}>
                    Edit Info
                  </button>
                </div>
              </section>
              {/* CREDITI */}
            </div>
          </div>
        </div>
      )
    } else if (mainBtn !== false) {
      foot = (
        <div className="row mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* INFO */}
              <section className="col blue latowhite d-flex flex-column justify-content-end align-items-center text-center ">
                <div>
                  <a className="medfont">{footTitle}</a>
                  <br />
                  <a className="smallfont">{footSubtitle}</a>
                  <br />
                  <a className="smallfont">{footSubtitle2}</a>
                </div>
                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col flexbutton solidgreen m-1" onClick={() => this.footInfoEdit("InfoEdit")}>
                    Edit Info
                  </button>
                </div>
              </section>
              {/* CREDITI */}
              <section className="col-md solidgreen crediti latowhite d-flex flex-column justify-content-end align-items-center text-center ">
                <div>
                  <a className="smallfont">{footCreditiTitle}</a>
                  <br />
                  <a className="smallfont"><i>{footCreditiSubtitle}</i></a>
                  <br />
                  <a className="verysmallfont">{footCreditiSubtitle2}</a>
                </div>
                <div className="stretch d-flex justify-content-center align-items-center">
                  <button className="col flexbutton brick m-1" onClick={() => this.footCreditsEdit("CreditsEdit")}>
                    Edit Credits
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )
    } else {
      foot = (
        <div className="row mt-2 mb-2">
          <div className="col">
            <div className="row">
              {/* INFO */}
              <section className="col blue pb-1 latowhite d-flex justify-content-center align-items-center text-center ">
                <div>
                  <a className="medfont">{footTitle}</a>
                  <br />
                  <a className="smallfont">{footSubtitle}</a>
                  <br />
                  <a className="smallfont">{footSubtitle2}</a>
                </div>
              </section>
              {/* CREDITI */}
              <section className="col-md-3 pt-1 solidgreen latowhite d-flex justify-content-center align-items-center text-center ">
                <div>
                  <a className="smallfont">{footCreditiTitle}</a>
                  <br />
                  <a className="smallfont"><i>{footCreditiSubtitle}</i></a>
                  <br />
                  <a className="verysmallfont">{footCreditiSubtitle2}</a>
                </div>
              </section>
            </div>
          </div>
        </div>
      )
    }

    return (
      // TITOLO, OROLOGIO E BUTTONS
      <section>
        <LoginDialog loginDiaShow={this.state.loginDiaShow} handleClose={this.hideModal} handleLogin={this.loginCheck}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Login</h5>
            </div>
            <div className="modal-body">
              <form id="loginEditForm">
                <div className="form-group">
                  <label>Utente</label>
                  <input type="text" className="form-control"
                    ref={(input) => { this.userInput = input; }} onChange={e => temp = e.target.value} />
                  <label>Password</label>
                  <input type="password" autocomplete="on" className="form-control" onChange={e => temp2 = e.target.value} />
                </div>
                <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Nome utente e password errati!</p>
                            <p className="smallfont">Controllare le credenziali e riprovare.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Conferma>
              </form>
            </div>
          </div>
        </LoginDialog>
        <LoginEditDialog loginEditDiaShow={this.state.loginEditDiaShow} handleClose={this.hideModal} handleEditLogin={this.loginEditCheck}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Edit Login</h5>
            </div>
            <div className="modal-body">
              <form id="loginForm">
                <div className="form-group">
                  <label>Utente</label>
                  <input type="text" className="form-control"
                    ref={(input) => { this.userChangeInput = input; }} onChange={e => temp = e.target.value} />
                  <label>Password</label>
                  <input type="password" autocomplete="on" className="form-control" onChange={e => temp2 = e.target.value} />
                </div>
                <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Nome utente e password modificati correttamente!</p>
                            <p className="smallfont">Premi "Chiudi" e utilizza l'ingranaggio per applicare.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Conferma>
                <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Errore!</p>
                            <p className="smallfont">Assicurarsi di aver compilato almeno un campo.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Errore>
              </form>
            </div>
          </div>
        </LoginEditDialog>
        <TitleDialog titleDiaShow={this.state.titleDiaShow} handleClose={this.hideModal} handleSave={this.saveTitle}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Modifica nome Istituto</h5>
            </div>
            <div className="modal-body">
              <form id="titleForm">
                <div className="form-group">
                  <label>Nome Istituto</label>
                  <input type="text" className="form-control" defaultValue={spData.headTitle} onChange={e => temp = e.target.value} /*placeholder={spData.headTitle}*/ />
                </div>
                <div className="form-group">
                  <label>Colore sfondo</label>
                  <input type="color" className="form-control" onChange={e => tempColor = e.target.value} placeholder={spData.headTitle} />
                </div>
                <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Modifica Salvata!</p>
                            <p className="smallfont">Premi "Chiudi" e utilizza l'ingranaggio per applicare.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Conferma>
                <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Errore!</p>
                            <p className="smallfont">Assicurarsi di aver inserito almeno un carattere.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Errore>
              </form>
            </div>
          </div>
        </TitleDialog>
        <LogoDialog logoDiaShow={this.state.logoDiaShow} handleClose={this.hideModal} handleUpload={this.uploadCheck}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Upload logo</h5>
            </div>
            <div className="modal-body">
              <form id="logoForm" encType="multipart/form-data">
                <div className="form-group">
                  <label>Scegli un file immagine per il logo (Max 1 MB)</label>
                  <input type="file" className="form-control" name="image" onChange={e => fileImg = e.target.files[0]} />
                </div>
                <div className="form-group">
                  <label>Colore sfondo</label>
                  <input type="color" className="form-control" onChange={e => tempColor = e.target.value} placeholder={spData.headTitle} />
                </div>
                <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">File caricato correttamente!</p>
                            <p className="smallfont">Premi "Chiudi" e utilizza l'ingranaggio per applicare.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Conferma>
                <Upload upShow={this.state.upShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Caricamento dati in corso...</p>
                            <p className="smallfont">Attendere prego.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Upload>
              </form>
            </div>
          </div>
        </LogoDialog>
        <InfoDialog infoDiaShow={this.state.infoDiaShow} handleClose={this.hideModal} handleSave={this.saveInfo}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Modifica info Istituto</h5>
            </div>
            <div className="modal-body">
              <form id="infoForm">
                <div className="form-group">
                  <label>Nome Istituto</label>
                  <input type="text" className="form-control" defaultValue={spData.footTitle} onChange={e => temp = e.target.value} /*placeholder={spData.footTitle}*/ />
                </div>
                <div className="form-group">
                  <label>Indirizzo Istituto</label>
                  <input type="text" className="form-control" defaultValue={spData.footSubtitle} onChange={e => temp2 = e.target.value} /*placeholder={spData.footSubtitle}*/ />
                </div>
                <div className="form-group">
                  <label>Telefono Istituto</label>
                  <input type="text" className="form-control" defaultValue={spData.footSubtitle2} onChange={e => temp3 = e.target.value} /*placeholder={spData.footSubtitle2}*/ />
                </div>
                <div className="form-group">
                  <label>Colore sfondo</label>
                  <input type="color" className="form-control" onChange={e => tempColor = e.target.value} placeholder={spData.headTitle} />
                </div>
                <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Modifica Salvata!</p>
                            <p className="smallfont">Premi "Chiudi" e utilizza l'ingranaggio per applicare.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Conferma>
              </form>
            </div>
          </div>
        </InfoDialog>
        <CreditDialog creditDiaShow={this.state.creditDiaShow} handleClose={this.hideModal} handleSave={this.saveCredit}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Modifica crediti Istituto</h5>
            </div>
            <div className="modal-body">
              <form id="creditForm">
                <div className="form-group">
                  <label>Etichetta Crediti</label>
                  <input type="text" className="form-control" defaultValue={spData.footCreditiTitle} onChange={e => temp = e.target.value} /*placeholder={spData.footCreditiTitle}*/ />
                </div>
                <div className="form-group">
                  <label>Crediti Pricipale</label>
                  <input type="text" className="form-control" defaultValue={spData.footCreditiSubtitle} onChange={e => temp2 = e.target.value} /*placeholder={spData.footCreditiSubtitle}*/ />
                </div>
                <div className="form-group">
                  <label>Crediti Secondario</label>
                  <input type="text" className="form-control" defaultValue={spData.footCreditiSubtitle2} onChange={e => temp3 = e.target.value} /*placeholder={spData.footCreditiSubtitle2}*/ />
                </div>
                <div className="form-group">
                  <label>Colore sfondo</label>
                  <input type="color" className="form-control" onChange={e => tempColor = e.target.value} placeholder={spData.headTitle} />
                </div>
                <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Modifica Salvata!</p>
                            <p className="smallfont">Premi "Chiudi" e utilizza l'ingranaggio per applicare.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Conferma>
              </form>
            </div>
          </div>
        </CreditDialog>
        <AppEditDialog appEditDiaShow={this.state.appEditDiaShow} handleClose={this.hideModal} handleSave={this.saveAppEdit}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Modifica Applicazione Web</h5>
            </div>
            <div className="modal-body">
              <form id="appEditForm">
                <div className="form-group">
                  <label>Scegli un file immagine per l'icona (Max 1 MB)</label>
                  <input type="file" className="form-control" name="icon" onChange={e => fileImg = e.target.files[0]} />
                </div>
                <div className="form-group">
                  <label>Titolo Applicazione</label>
                  <input type="text" className="form-control" defaultValue={tempAppTitle} onChange={e => temp2 = e.target.value} /*placeholder={tempAppTitle}*/ />
                </div>
                <div className="form-group">
                  <label>Link Applicazione</label>
                  <input type="text" className="form-control" defaultValue={tempAppLink} onChange={e => temp3 = e.target.value} /*placeholder={tempAppLink}*/ />
                </div>
                <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Modifiche Salvate!</p>
                            <p className="smallfont">Premi "Chiudi" e utilizza l'ingranaggio per applicare.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Conferma>
                <Upload upShow={this.state.upShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Caricamento dati in corso...</p>
                            <p className="smallfont">Attendere prego.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Upload>
              </form>
            </div>
          </div>
        </AppEditDialog>
        <AppAddDialog appAddDiaShow={this.state.appAddDiaShow} handleClose={this.hideModal} handleSave={this.applyAppAdd}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Aggiungi Applicazione Web</h5>
            </div>
            <div className="modal-body">
              <form id="appAddForm">
                <div className="form-group">
                  <label>Scegli un file immagine per l'icona (Max 1 MB)</label>
                  <input type="file" className="form-control" name="icon" onChange={e => fileImg = e.target.files[0]} />
                </div>
                <div className="form-group">
                  <label>Posizione Applicazione (da 1 a {arrayLength}) o lasciare vuoto per ultima.</label>
                  <input type="text" className="form-control" onChange={e => temp = e.target.value} />
                </div>
                <div className="form-group">
                  <label>Titolo Applicazione</label>
                  <input type="text" className="form-control" onChange={e => temp2 = e.target.value} />
                </div>
                <div className="form-group">
                  <label>Link Applicazione</label>
                  <input type="text" className="form-control" onChange={e => temp3 = e.target.value} />
                </div>
                <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">App aggiunta!</p>
                            <p className="smallfont">Premi "Chiudi" e utilizza l'ingranaggio per applicare.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Conferma>
                <Upload upShow={this.state.upShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Caricamento dati in corso...</p>
                            <p className="smallfont">Attendere prego.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Upload>
                <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
                  <div className="row text-center pt-2">
                    <div className="col">
                      <div className="row">
                        <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                          <div>
                            <p className="norfont">Errore!</p>
                            <p className="smallfont">Assicurarsi di aver compilato tutti i campi.</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Errore>
              </form>
            </div>
          </div>
        </AppAddDialog>
        <AppDelDialog appDelDiaShow={this.state.appDelDiaShow} handleClose={this.hideModal} handleSave={this.applyAppDel}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Rimuovere l'applicazione in maniera definitiva?</h5>
            </div>
            <div className="modal-body">
              <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
                <div className="row text-center pt-2">
                  <div className="col">
                    <div className="row">
                      <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                        <div>
                          <p className="norfont">Applicazione Rimossa!</p>
                          <p className="smallfont">Premi "Chiudi" e utilizza l'ingranaggio per applicare.</p>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </Conferma>
            </div>
          </div>
        </AppDelDialog>
        <div className="stickytop">
          {head}
          {buttons}
        </div>
        {/* APPS */}
        <div className="textcenter">
          {
            this.state.appItems.map(({ id, title, link, icon }, i) => {
              return (
                <App showAppsBtn={this.state.appsBtnShow} key={i} pos={i}
                  title={title} link={link} icon={icon}
                  appEditDel={this.appEditDel} appAddItem={this.appAddItem} />
              )
            })
          }
          {/* FOOTER */}
          {foot}
        </div>
      </section>
    );
  }
}

class SettingsGear extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const gearClick = () => {
      this.props.handleShowButtons(true);
    }
    return (
      <div className="gear mt-2 mb-2" title="Settings mode" alt="Settings Mode" onClick={() => gearClick()}>
        <GearIcon></GearIcon>
      </div>
    );
  }
}

class LogoImg extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <img className="logo mt-2 mb-2" title="Logo" alt="Logo" src={spData.LogoIcon} />
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let appBtn = ""
    if (this.props.showAppsBtn === "ShowAppBtn" && this.props.title !== "Add Item") {
      appBtn = (
        <div className="appcontainer">
          < a title={this.props.title} href={this.props.link} target="_blank">
            <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
          </a>
          <h4><p className="lato"><b>{this.props.title}</b></p></h4>
          <div className="row btncontainer">
            <button className="col appbutton solidgreen m-1" onClick={() => this.props.appEditDel("AppEdit", this.props.pos)}>
              Edit
            </button>
            <button className="col appbutton solidbrick m-1" onClick={() => this.props.appEditDel("AppDel", this.props.pos)}>
              Remove
            </button>
          </div>
        </div>
      )
    } else if (this.props.title === "Add Item") {
      appBtn = (
        <div className="appcontainer">
          < a title={this.props.title} target="_blank" onClick={() => this.props.appAddItem("AddItem", this.props.pos)} >
            <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
          </a>
          <h4><p className="lato"><b>{this.props.title}</b></p></h4>
          <div className="row btncontainer">
            <button className="col addbutton solidgreen m-1" onClick={() => this.props.appAddItem("AddItem", this.props.pos)}>
              Add Item
            </button>
          </div>
        </div>
      )
    } else {
      appBtn = (
        <div className="appcontainer">
          < a title={this.props.title} href={this.props.link} target="_blank" /* onClick={() => appClicked()} */>
            <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
          </a>
          <h4><p className="lato"><b>{this.props.title}</b></p></h4>
        </div>
      )
    }
    return (
      <>
        {appBtn}
      </>
    );
  }
}

function Orologio() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);
  return (
    <div className="Orologio">
      {/* <ClockIcon /> */}
      <p className="medfont">
        {dateState.toLocaleString('it-IT', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
        })}
      </p>
      {/* <CalenderIcon /> */}
      <p className="smallfont">
        {' '}
        {dateState.toLocaleDateString('it-IT', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </p>
    </div>
  );
}

// ========================================

const header = ReactDOM.createRoot(document.getElementById("root"));
header.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);