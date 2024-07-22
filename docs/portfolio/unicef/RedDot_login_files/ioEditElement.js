//Java-Script-Code zum Editieren von RedDot-Elementen

	var sScriptVersionEditElement="1.33";

	function DeleteUserdefinedOptionlistEntry(sEltUserDefinedId)
		{
			if (document.getElementById(sEltUserDefinedId))
				document.getElementById(sEltUserDefinedId).value="";
		}

	function DeleteOptionlistEntry(sEltId)
		{
			if (window.event)
				{
					if (window.event.keyCode==9 || window.event.shiftKey)//TAB-Taste
						return;
				}	
			
			if (document.getElementById(sEltId))
				document.getElementById(sEltId).selectedIndex=-1;
		}		

	function GetFileName(sFullFileNameA)
	{
		if (sFullFileNameA == "") return "";

		var sFullFileName = sFullFileNameA;
		var iBeginFileName = sFullFileName.lastIndexOf("\\");

		if (iBeginFileName == -1) return sFullFileName;
		
		return sFullFileName.slice(iBeginFileName+1);
	}

	function ValidateFileSuffix(sAllowedSuffixesA, sFileNameA)
	{
		if (sFileNameA == "") return false;
		if (sAllowedSuffixesA == "") return true;

		var sFileName = GetFileName(sFileNameA);
		var arSuffixes = null;
		var bSuffixFound = false;

		if (sAllowedSuffixesA.indexOf(",")>0)
					arSuffixes = sAllowedSuffixesA.split(","); //Init the Array
				else
					arSuffixes = sAllowedSuffixesA.split(";"); //Init the Array

				var sSuffix = sFileNameA.slice(sFileNameA.lastIndexOf(".")+1).toLowerCase(); //get suffix from current file
				
				for (var iSuffix=0; iSuffix<arSuffixes.length; iSuffix++)
					if (arSuffixes[iSuffix].toLowerCase() == sSuffix)
							{ bSuffixFound = true; break; }

				return bSuffixFound;
	}

	function KillError()
		{
		 return true
		}

	window.onerror = KillError;

	function GetKeyState()
	{
			if (window.event.ctrlKey && window.event.shiftKey && (window.event.keyCode == 8))
			{
				window.document.oncontextmenu=EnableCon;
				return false;
			}
	}

	function EnableCon()
	{ return true; }

	var objDialogWindow=null;

	var BaseFontSize="";
	var BaseFontFace="";
	var BaseFontColor="";
					
	if (document.all != null)
		{
			var objBaseFont=document.all.tags("BASEFONT");
			if (objBaseFont.length > 0)
				{
					BaseFontSize=String(objBaseFont(0).getAttribute("size")); 
					BaseFontFace=String(objBaseFont(0).getAttribute("face")); 
					BaseFontColor=String(objBaseFont(0).getAttribute("color")); 
				}
		}

	var FontSize="";
	var FontFace="";
	var FontColor="";
	var TempFontSize="";
	var TempFontFace="";
	var TempFontColor="";
	var FontSettings="";
		
	if (!isNaN(BaseFontSize))
		{
			iBaseFontSize=Number(BaseFontSize);
		}
	
	function CheckFont(objThis)
		{
			if (document.all != null)
				{
					FontSize="";
					FontFace="";
					FontColor="";
					PrepareFontSettings(objThis);
					if (FontSize.indexOf("+") > -1 || FontSize.indexOf("-") > -1)
						{
							if (BaseFontSize == "")	
								{
									FontSize=3;
								}
							else
								{var sValue=FontSize.slice(1);
														
									if (FontSize.indexOf("+") > -1)
										{
											FontSize=String(Number(BaseFontSize)+Number(sValue));
										}
									else
										{
											FontSize=String(Number(BaseFontSize)-Number(sValue));
										}	 
								}		
						}
					else if (FontSize == "")	
						{
							FontSize=BaseFontSize;
						}					
					
					FontSettings="";
					
					if (FontSize != "")	
						FontSettings=FontSettings + "&FontSize=" + FontSize
						
					if (FontFace != "")		
						FontSettings=FontSettings + "&FontFace=" + escape(FontFace)
						
					if (FontColor != "")			
						FontSettings=FontSettings + "&FontColor=" + escape(FontColor);
				}
		}
	
	function PrepareFontSettings(objThis)
		{					
			if (objThis.parentElement.tagName != "BODY")
				{
					if (objThis.parentElement.tagName == "FONT" || objThis.parentElement.tagName == "BASEFONT")
						{
							TempFontSize=String(objThis.parentElement.getAttribute("size"));
							TempFontFace=String(objThis.parentElement.getAttribute("face"));
							TempFontColor=String(objThis.parentElement.getAttribute("color"));
							if (TempFontSize != "" && FontSize == "" && objThis.parentElement.tagName != "BASEFONT")
								{
									FontSize=TempFontSize;
								}
							if (TempFontFace != "" && FontFace == "")
								FontFace=TempFontFace;
							if (TempFontColor != "" && FontColor == "")
								FontColor=TempFontColor;
						}
					PrepareFontSettings(objThis.parentElement);
				}			
		}
				
	function EditElement(URL)
		{			
			URL=URL + FontSettings + "&OpenerIsRedDot=1";			
			OpenWindow(URL);
		}

	function CheckAllTargets()
		{
			for (var i=0;i<document.links.length;i++)//Targets pruefen und evtl. korrigieren
				{
					var sTarget=document.links.item(i).target;
					
					if(sTarget == "_blank" || sTarget == "_top")
						document.links.item(i).target="ioMain";
				}			
		}
	
	function CheckTargetExtended(sThis,sRedDotTopA)
		{
			var sRedDotTop="top";
			if (sRedDotTopA)
				sRedDotTop=sRedDotTopA;
			
			var iLen=eval(sRedDotTop + '.frames["ioMain"].frames.length');   
			var sTarget=sThis.target;
		 		  
			if (iLen > 0)
				{
					if (eval(sRedDotTop + '.frames["ioMain"].frames[sThis.target]') == null)
						{
							sThis.target="ioMain";
						}
				}
			else if(sTarget == "_blank" || sTarget == "_top")
				{
					sThis.target="ioMain";
				}
			else if(sTarget != "_self" || sTarget != "_parent")
				{
					sThis.target="ioMain";
				}
		}

	function CheckTarget(sThis)
		{var sTarget=sThis.target;
		 		  
			if(sTarget == "_blank" || sTarget == "_top")
				{
					sThis.target="ioMain";
				}
		}

	function OpenModalWindow(sURL)
		{
			var sResult=String(window.showModalDialog(sURL,0,"dialogWidth:650px;dialogHeight:550px"));
						
			return (sResult!="undefined");
		}
	
	function OpenWindow(URL, iFixedWidth, iFixedHeight, sWindowName, sWindowFeatures) {

			var oBrowser = new BrowserProps();//
			
			var iWidth=oBrowser.ScreenAvailWidth/1.3;
			var iHeight=oBrowser.ScreenAvailHeight/1.3;

			if (sWindowName!=null && sWindowName.toUpperCase() == "ONLINEHELP") {
				//Es soll die Online Hilfe gestartet werden. Feste Fentergroesse
				iWidth=590;
				iHeight=550;
			} else {
				//Ueberpruefen ob die Mindestgroesse des Fensters unterschritten ist
				if (iFixedWidth!=null)
					iWidth = iFixedWidth;
				else if (iWidth<650) iWidth=650;

				if (iFixedHeight!=null)
					iHeight = iFixedHeight;
				else if (iHeight<650) iHeight=550;
			}

			//Das Fenster zentriert darstellen
			var iLeft=oBrowser.ScreenAvailWidth/2 - iWidth/2;
			var iTop=oBrowser.ScreenAvailHeight/2 - iHeight/2 - 25;		
			if (iLeft<0) iLeft=0;
			if (iTop<0) iTop=0;
			
			//Wenn kein spezielles Fenster geoeffnet werden soll. Ein aelteres schliessen
			if (sWindowName==null) CloseWindow();

 			//BrowserCache austricksen
			var DummyDate=new Date();
			var DummyTime=String(DummyDate.getTime());			 
 			if (URL.indexOf(".asp?")>-1)
 					URL=URL + "&DummyRefreshTime=" + DummyTime;

			if (sWindowFeatures) 				
				sWindowFeatures += ",width=" + iWidth + ",height=" + iHeight + ",screenX=" + iLeft + ",screenY=" + iTop + ",left=" + iLeft + ",top=" + iTop;
			else
				sWindowFeatures = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=" + iWidth + ",height=" + iHeight + ",screenX=" + iLeft + ",screenY=" + iTop + ",left=" + iLeft + ",top=" + iTop;

			if (!sWindowName) 
				objDialogWindow=window.open(URL, "_blank", sWindowFeatures);
			else
				return window.open(URL, sWindowName, sWindowFeatures);
				//Es wird ein spezielles Fenster geoeffnet. Der Aufrufer uebernimmt selbst die Verwaltung
	}
			
	function ReloadURL()
		{				
			var NewUrl=String(document.location.href);
						
			if (NewUrl.indexOf("#CloseRedDot") == -1)
				NewUrl=NewUrl + "#CloseRedDot";
										
			with (document.location)
				{
					replace(NewUrl);
					hash;
					reload();					
				}
		}
		
	function AddElementToFavorites(sRedDotTopA)
		{
			var sRedDotTop="top";
			if (sRedDotTopA)
				sRedDotTop=sRedDotTopA;
			
			var objTreeFrame=eval(sRedDotTop + ".frames.ioTree");
			var sType=objTreeFrame.sActiveType;
			var sActiveGUID=objTreeFrame.sActiveGUID;
			var sSegmentId=objTreeFrame.sSegmentId;			
			var sValue1=objTreeFrame.document.all("Col1" + sSegmentId).innerHTML;	
			var sValue2=objTreeFrame.document.all("Col2" + sSegmentId).innerHTML;			
			var sValue=escape(sValue1 + "&nbsp;&nbsp;" + sValue2);
			var sImageTitle=objTreeFrame.document.all("IMGType" + sSegmentId).src;					 			
			var iPos=sImageTitle.lastIndexOf("/");
			sImageTitle=sImageTitle.slice(iPos+1);
			
			document.location="ioFavorites.asp?Action=AddFavorite&ImageTitle=" + sImageTitle + "&Guid=" + sActiveGUID + "&Type=" + sType + "&Value=" + sValue;
			
		}

	function SearchForNotAllowedChars(sValueTextField, sNotAllowed)
		{
			//Alle Zeichen sind erlaubt
			//nicht erlaubte werden uebergeben
			var sChar = "";
			var oReg = null;
			var RegEx = new RegExp("");
			
			switch (sNotAllowed.toUpperCase())
			{
				case "TEMPLATENAME":
						sNotAllowed = "34,38,39,63,60,62,58,124,42,92"; //"&'?<>:|*\
						break;
			}
			var arNotAllowed = sNotAllowed.split(",");

			for (var iCount=0; iCount <= arNotAllowed.length; iCount++)
			{
				sChar = String.fromCharCode(arNotAllowed[iCount]);
				if (sValueTextField.indexOf(sChar)>=0)
						{ 
							if (sChar == "\\") sChar = "\\\\";
							if (sChar == "*") sChar = "\\*";
							RegEx = RegExp(sChar , "gi");
							sValueTextField = sValueTextField.replace(RegEx, "");
						}

			}
			return sValueTextField;
		}

		
	function DeleteNonStandardChars(sValue, sSpecialAllowed, sMessage)
		{
		//Standard erlaubt "a-z", "A-B", "0-9"
		//sSpecialAllowed: Komma getrennte Zahlen die den ASCII Code darstellen der erlaubt wird
			var sWINDOWSFILENAME = "32,36,40,41,45,46,95,126";
			var sFTPFILENAME = "36,45,46,95,126";

			// "(34) %(37) '(39) ,(44) ^(94) `(96) (176) (180)
			var sSTANDARDFIELD = "32,33,35,36,38,40,41,42,43,45,46,47,58,59,60,61,62,63,64,91,92,93,95,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,177,178,179,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255";

			var sValueOld = sValue;

			if (sSpecialAllowed.toUpperCase() == "IDENTIFIER")
								sSpecialAllowed = "95";
			if (sSpecialAllowed.toUpperCase() == "WINDOWSPATH")
								sSpecialAllowed = "58,47,92," + sWINDOWSFILENAME; // :/\
			if (sSpecialAllowed.toUpperCase() == "FTPPATH")
								sSpecialAllowed = "58,47," + sFTPFILENAME; // :/
			if (sSpecialAllowed.toUpperCase() == "WINDOWSFILENAME")
								sSpecialAllowed = sWINDOWSFILENAME;
			if (sSpecialAllowed.toUpperCase() == "FTPFILENAME")
								sSpecialAllowed = sFTPFILENAME;
			if (sSpecialAllowed.toUpperCase() == "STANDARDFIELD")
								sSpecialAllowed = sSTANDARDFIELD;

		if (arguments.length==4) {
			sSpecialAllowed += "," + arguments[3];
		}
		
		var I, C, J, arAllowed, bAllowed;
		arAllowed = sSpecialAllowed.split(",");
		
		for (I=0; I < sValue.length; I++)
		{

			C = sValue.charCodeAt(I)
			if (C >= 48 && C <= 57) continue; //Zahl
			if (C >= 65 && C <= 90) continue; //Buchstabe GROSS
			if (C >= 97 && C <= 122) continue; //Buchstabe klein

			bAllowed = false;
			for (J=0; J <= arAllowed.length; J++)
			{
				if (C == arAllowed[J])
							{ bAllowed = true; break; }
			}
			if (bAllowed == true) continue;

			sValue = ReplaceChar(sValue, I);
			I = I - 1; //notig da zeichen durch nix ersetzt wird
		}

		if (sValueOld != sValue && sMessage != "")
																alert(sMessage);

		return sValue;
	}	
	
	function ReplaceChar(sValue, I)
		{
			return sValue.substring(0, I) + "" + sValue.substring(I+1, sValue.length+1);
		}

	function FilterElementName(objTextField)
		{
			//Alle Zeichen im Bereich 33-255
			//Nicht erlaubte Zeichen sind sNotAllowed
			//Alle StdZeichen sind erlaubt. Andere auch es wird jedoch eine Warnung ausgegeben

			var sNotAllowed = "126,35,43,176,94,167,92,47,40,41,61,63,33,36,38,37,34,60,62,39,180,96,123,125,42,46,32";
			var sValue = objTextField.value;

			var I=0, C=0, J=0, bNotAllowed=false, bWarnUser=false;
			var arNotAllowed;
			var arNotAllowed = sNotAllowed.split(",");

			for (I=0; I < sValue.length; I++)
			{

				C = sValue.charCodeAt(I)
				if (C >= 48 && C <= 57) continue; //Zahl
				if (C >= 65 && C <= 90) continue; //Buchstabe GROSS
				if (C >= 97 && C <= 122) continue; //Buchstabe klein
				if (C == 95) continue; //_

				//verbotene zeichen suchen
				bNotAllowed = false;
				for (J=0; J <= arNotAllowed.length; J++)
				{
					if (C == arNotAllowed[J])
								{ bNotAllowed = true; break; }
				}

				if (bNotAllowed == true)
				{
					sValue = ReplaceChar(sValue, I);
					I = I - 1; //notig da zeichen durch nix ersetzt wird
				}
				else //Char wird Supported aber nicht empfohlen
				{
					bWarnUser = true;
				}
			}


			if (objTextField.value != sValue)
			{
				objTextField.value = sValue;
				return 2;
			}
			else if (bWarnUser == true)
			{
				return 1;
			}

			return 0;
		}
	
	function ConvertToAscii(sBuffer)
		{
			sBuffer=sBuffer.replace(/&auml;/g, String.fromCharCode(228));
			sBuffer=sBuffer.replace(/&Auml;/g, String.fromCharCode(196));
			sBuffer=sBuffer.replace(/&ouml;/g, String.fromCharCode(246));
			sBuffer=sBuffer.replace(/&Ouml;/g, String.fromCharCode(214));
			sBuffer=sBuffer.replace(/&uuml;/g, String.fromCharCode(252));
			sBuffer=sBuffer.replace(/&Uuml;/g, String.fromCharCode(220));
			sBuffer=sBuffer.replace(/&szlig;/g, String.fromCharCode(223));
			sBuffer=sBuffer.replace(/&lt;/g,"<");
			sBuffer=sBuffer.replace(/&gt;/g,">");						
			return sBuffer;
		}

	function ShowBusyLabel()
		{
			if (document.all!=null)
				{
					document.body.style.cursor="wait";
					document.all("ServerReady").style.display="none";
					document.all("ServerBusy").style.display="";
				}
			else
				{
					document.layers.ServerBusy.visibility = "show";
				}
		}

	function trimString(sValue)
	{
		var i=0;
		while (sValue.charCodeAt(i) == 32 && i<sValue.length) i++;
		if (i>0) sValue = sValue.substring(i, sValue.length);

		i=sValue.length-1
		while (sValue.charCodeAt(i) == 32 && i>0) i--;
		if (i<sValue.length-1) sValue = sValue.substring(0, ++i);

		return (sValue);
	}

	function CloseWindow()
	{
		//use objDialogWindow.name to preserve Netscape4 from crashes
		if (String(navigator.appName + navigator.appVersion).indexOf("Netscape4")>-1) {
				if (objDialogWindow != null && String(objDialogWindow.name) != "undefined")
						objDialogWindow.close();
		}
		else {
				var i=0;
				if (objDialogWindow!=null && !objDialogWindow.closed) {
						objDialogWindow.close(); 
 						while (!objDialogWindow.closed) i=1;
				}
		}

	}


	function OpenMediaCatalog(URL)
		{
			var fClosed=false;		 

			var oBrowser = new BrowserProps();

			var iWidth=oBrowser.ScreenAvailWidth/1.2;
			var iHeight=oBrowser.ScreenAvailHeight/1.2;
			var iLeft=oBrowser.ScreenAvailWidth/2 - iWidth/2;
			var iTop=oBrowser.ScreenAvailHeight/2 - iHeight/2 - 25;
			
			var DummyDate=new Date();
			var DummyTime=String(DummyDate.getTime());			 
			CloseWindow();

 			if (URL.indexOf(".asp?")>-1)
 					URL=URL + "&DummyRefreshTime=" + DummyTime;

 				
			objDialogWindow=window.open(URL,"_blank",'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=' + iWidth + ',height=' + iHeight + ',screenX=' + iLeft + ',screenY=' + iTop + ',left=' + iLeft + ',top=' + iTop);			
		}

	function CountDown(sFunctionName, sParam)
	{
		var sCalling = sFunctionName + "(" + sParam + ")";
		window.setTimeout(sCalling, 200);
	}
	

	//Achtung! Diese Funktion wird von Kunden benutzt, um beim Klicken eines Links die geoeffnete Seite zu schliessen - also nie loeschen!!!
	function CloseRedDotPage()
    {
      if (eval(sRedDotTop + ".frames.ioMain.frames.length")==0)
          {
               var sURL=String(window.document.location.href);       
               if (sURL.indexOf("Mode=2") > -1)
                    {              
                         var sNewURL=sURL.replace("Mode=2","Mode=4");                                
                         window.document.location.replace(sNewURL);          
                    }
          }
      else
				{
					var objMenuFrame=eval(sRedDotTop + ".frames.ioMenu");
          objMenuFrame.CloseEditedPage();
        } 
     }
	
	
	var iReturnViaJSFunction=0;
	function OpenExternalSystem(sURL, sFeatures) {
		//oeffnet die Web Oberflaeche des externen System
		//und setzt iReturnViaJSFunction sofern mindestens drei argumente uebergeben wurden.
		//Dies hat zur folge das am ende des transfers eine JS Funktion den Dokumentnamen einsetzt und nicht wie sonst
		//ueblich, die CMS Seite neugeladen wird

			CloseWindow();
			objDialogWindow=window.open(sURL, "_blank", sFeatures);
			if (arguments[2]) iReturnViaJSFunction=arguments[2]; else iReturnViaJSFunction=0;
	}

	function uploadFinished(sFileName) {
		if (iReturnViaJSFunction>0) {
			insertDocumentName(sFileName);
		}
		else {
			if (window.name=="ioActionMenu") ReloadTreeSegment(); else window.location.reload();
		}

	}



function BrowserProps() {

		//ermitteln der maximalen Fenstergroesse
		if (navigator.userAgent.indexOf("Opera")>-1) {
			this.ScreenAvailWidth		= top.window.innerWidth;
			this.ScreenAvailHeight	= top.window.innerHeight;
		}
		else {
			this.ScreenAvailWidth		= screen.availWidth;
			this.ScreenAvailHeight	= screen.availHeight;
		}
				
}

