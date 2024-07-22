var GlossaryPopup = null;
var TipsTricksPopup = null;
var GenericPopup = null;
var SecurePopup = null;
var LinkPopup = null;
var strBaseUrl;
var strSecureBaseUrl;

/* Constants */
var G_PARAM_PRODUCT_ID = "PRDID"
var G_PARAM_DISCLOSURE_ID = "DSCID"
var G_PARAM_THREE_DAY_DISCLOSURE_TYPE_ID = "TDDTYP"
var G_PARAM_DISCLOSURE_DISPLAY_TYPE = "DDTYP"
var G_DISCLOSURE_DISPLAY_TYPE_APP_DISCLOSURE_VIEW = 1
var G_DISCLOSURE_DISPLAY_TYPE_THREE_DAY_DISCLOSURE_VIEW = 2
var G_DISCLOSURE_DISPLAY_TYPE_THREE_DAY_DISCLOSURE_MARK = 3
var G_DISCLOSURE_DISPLAY_TYPE_GENERAL_VIEW = 4
var G_DISCLOSURE_DISPLAY_TYPE_THREE_DAY_PREVIEW = 5

strBaseURL = 'http://unfcu.mortgagewebcenter.com/';
strSecureBaseURL = 'https://unfcu.mortgagewebcenter.com/';

function FormatUrl(pstrIsSecure,pstrURL) {
	if (pstrIsSecure == 'Y')
		return strSecureBaseURL + pstrURL;
	else
		return strBaseURL + pstrURL;
}

function GetURL(pstrIsSecure,pstrURL) {
	return FormatUrl(pstrIsSecure,pstrURL)
}

function DisplayPDF(pstrURL,pstrName,pintWidth,pintHeight){
	window.open(pstrURL,pstrName,"width=" + pintWidth + ",height=" + pintHeight + ",toolbar=0,location=0,directories=0,resizable=1,status=0,menubar=0,scrollbars=1");
}

function OpenHelpPopup(plngHelpID) {
	OpenPopup(strBaseURL + 'ResourceCenter/Help.asp?HID=' + plngHelpID, 'Help', '350', '200', false)
}

function OpenGeneralDisclosurePopup(plngDisclosureID) {
	OpenPopup(strSecureBaseURL + 'Disclosure/ViewDisclosure.asp?' + G_PARAM_DISCLOSURE_DISPLAY_TYPE + '=' + G_DISCLOSURE_DISPLAY_TYPE_GENERAL_VIEW + '&' + G_PARAM_DISCLOSURE_ID + '=' + plngDisclosureID,'DisplayDisclosure',500,500,true)
}

function OpenThreeDayDisclosurePopup(plngThreeDayDisclosureTypeID,plngProductID) {
	OpenPopup(strSecureBaseURL + 'Disclosure/ViewDisclosure.asp?' + G_PARAM_DISCLOSURE_DISPLAY_TYPE + '=' + G_DISCLOSURE_DISPLAY_TYPE_THREE_DAY_PREVIEW + '&' + G_PARAM_THREE_DAY_DISCLOSURE_TYPE_ID + '=' + plngThreeDayDisclosureTypeID + '&' + G_PARAM_PRODUCT_ID + '=' + plngProductID,'DisplayDisclosure',500,500,true)
}

function GoToLink(pstrIsSecure,pstrURL) {
	if (pstrIsSecure == 'N') {
		pstrURL = strBaseURL + pstrURL
	} else {
		pstrURL = strSecureBaseURL + pstrURL
	}
		location.href = pstrURL
}


function OpenSecurePopup(pstrURL, pstrName, pintwidth, pintheight, pshowMenu) {
	SecurePopup = OpenPopup(FormatUrl('Y',pstrURL), pstrName, pintwidth, pintheight, pshowMenu);
}

function OpenGenericPopup(pstrURL, pstrName, pintwidth, pintheight, pshowMenu) {
	GenericPopup = OpenPopup(FormatUrl('N',pstrURL), pstrName, pintwidth, pintheight, pshowMenu);
}

function OpenGuaranteePopup(pstrURL, pstrName, pintwidth, pintheight, pshowMenu) {
	GuaranteePopup = OpenPopup(FormatUrl('N',pstrURL), pstrName, pintwidth, pintheight, pshowMenu);
}

function OpenRateWatchPopup(pstrFullURL) {
	RatePopup = OpenPopup(pstrFullURL,'RateWatch',530,450,false);
}

function OpenGlossaryPopup(plngTermID) {
	GlossaryPopup = OpenPopup(strBaseURL + 'ResourceCenter/PopupGlossary.asp?GID=' + plngTermID,'Glossary',340,250,false);
}

function OpenTipPopup(plngTipID) {
	TipsTricksPopup = null;
	TipsTricksPopup = window.open(strBaseURL + 'ResourceCenter/PopupTip.asp?TID=' + plngTipID,'Tip',"width=450,height=500,toolbar=0,location=0,directories=0,resizable=1,status=1,menubar=0,scrollbars=1");
}

function OpenLinkPopup(pstrFullURL, pstrName, pintwidth, pintheight) {
	if (LinkPopup != null) {
		if (LinkPopup.closed == false)
			LinkPopup.close()
	}
	LinkPopup = window.open(pstrFullURL,pstrName,"width=" + pintwidth + ",height=" + pintheight + ",toolbar=0,location=0,directories=0,resizable=1,status=1,menubar=1,scrollbars=1");
	return LinkPopup;
}

function OpenPopup(pstrFullURL, pstrName, pintwidth, pintheight, pshowMenu) {
	Popup = null;
	if (pshowMenu) {
		Popup = window.open(pstrFullURL,pstrName,"width=" + pintwidth + ",height=" + pintheight + ",toolbar=0,location=0,directories=0,resizable=0,status=1,menubar=1,scrollbars=1");
	} else {
		Popup = window.open(pstrFullURL,pstrName,"width=" + pintwidth + ",height=" + pintheight + ",toolbar=0,location=0,directories=0,resizable=0,status=1,menubar=0,scrollbars=1");
	}
	//Popup.focus();
	return Popup;
}

function CloseOpenPopups() {

	if(GenericPopup != null) {
		if (GenericPopup.closed == false)
			GenericPopup.close()
	}
	if(SecurePopup != null) {
		if (SecurePopup.closed == false)
			SecurePopup.close()
	}
	if(GlossaryPopup != null) {
		if (GlossaryPopup.closed == false)
			GlossaryPopup.close()
	}
	if(TipsTricksPopup != null) {
		if (TipsTricksPopup.closed == false)
			TipsTricksPopup.close()
	}
	if(LinkPopup != null) {
		if (LinkPopup.closed == false)
			LinkPopup.close()
	}
}