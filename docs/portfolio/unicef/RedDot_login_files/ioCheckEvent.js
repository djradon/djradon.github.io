//JavaScript-Code zum Abfangen der Enter-Taste, um ein vorzeitiges Submit zu verhindern

	var sScriptVersionCheckEvent="1.33";

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

	var Browser=navigator.appName;		
	var fNetscape=(Browser == "Netscape");
	var fKeyPressed=false;
	var iMaxSize=0; 
	var This=null;
	var Which="";
	
	if (fNetscape)
		{var iF=0;
		 var iE=0;

			for (iF = 0; iF < document.forms.length; iF++)
				{
					for (iE = 0; iE < document.forms[iF].length; iE++)
						{
							document.forms[iF].elements[iE].onchange=CheckMaxSize;  
							document.forms[iF].elements[iE].onkeypress=SetKeyPressed;  
							document.forms[iF].elements[iE].onkeydown=CheckMaxSize;  
							document.forms[iF].elements[iE].onmousedown=SetMousePressed;
						}	
				}
		}
	
	MaxSizeLabelTimer();
	
	function SetMaxSize(ThisA,iMaxSizeA)
		{
			if (String(top.frames.ioButtons)=="undefined")
				return;
			
			if (iMaxSizeA==-1)
				return;
			
			if (iMaxSizeA==0)
				iMaxSizeA=255;
			
			This=ThisA;
			iMaxSize=iMaxSizeA;
						
			var sValue=This.value;						
			var iCharsLeft=Number(iMaxSize - sValue.length - 1);
			
			if (sValue.length == 0)
				iCharsLeft=iMaxSize;

			if (iCharsLeft < 0)
				iCharsLeft=0;
			
			if (top.frames.ioButtons.SetMaxLabel != null)
				{
					if (iMaxSize == 0)
						top.frames.ioButtons.SetMaxLabel("");	
					else
						top.frames.ioButtons.SetMaxLabel(iCharsLeft);				
				}
		}

	function MaxSizeLabelTimer()
		{				
			if (String(top.frames.ioButtons)=="undefined")
				return;

			if (iMaxSize != null || String(This) != "undefined" || This != null )
				if (iMaxSize == 0)
					{
					 	if (top.frames.ioButtons.SetMaxLabel != null)
							top.frames.ioButtons.SetMaxLabel("");										
					}
				else	
					{
						var sValue=This.value;					
						var iCharsLeft=Number(iMaxSize - sValue.length);
											
						if (iCharsLeft < 0)
							iCharsLeft=0;
					 	
					 	if (top.frames.ioButtons.SetMaxLabel != null)
							top.frames.ioButtons.SetMaxLabel(iCharsLeft);					
					}	
			window.setTimeout("MaxSizeLabelTimer()",500);		
		}

	function CheckMaxSize(Key)
		{
						
			if (fNetscape)
				{
					if (Key.which==8 || Key.which==127 || Key.which==28 || Key.which==29 || Key.which==30 || Key.which==31 || Key.which==46)
						return true;
				}
			else if (event)
				{
					if (event.keyCode==8 || event.keyCode==127 || event.keyCode==28 || event.keyCode==29 || event.keyCode==30 || event.keyCode==31 || event.keyCode==46)
						return true;
				}

			if (iMaxSize == null || String(This) == "undefined" || This == null )
				{										
					return true;
				}
			else if(iMaxSize == 0)
				{					
					return true;			 	
				}	
			else 
				{
					var sValue=This.value;					
					
					if (iMaxSize != 0 && iMaxSize <= sValue.length)
						{																												
							This.value=sValue.slice(0,iMaxSize);							
							return false;							
						}
					else
						{
							return true;	
						}
				}	
		}
		
	function CheckInput(objInput)
		{
			if (iMaxSize>0)
				{
					var sValue=objInput.value;

					if (sValue.length >= iMaxSize)
						{
							objInput.value=sValue.substring(0,iMaxSize);			
							objInput.blur();
						}
				}
		}
		
	function SetKeyPressed(Key)
		{
			fKeyPressed=true;											
		}
	
	function SetMousePressed()
		{
			fKeyPressed=false;
		}
	
	function CheckKeyState()
		{
			if (fKeyPressed)
				return false;
			else								
				return true;					
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

			var sNotAllowed = "32,33,34,35,36,37,38,39,40,41,42,43,46,47,60,61,62,63,92,94,96,123,125,126,167,176,180";
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

	function removeUrlParam(sUrl, regUrlParam) {
		//sucht nach einem URL- Parameter, markiert diesen einschliesslich des values und entfernt alles aus dem Querystring

		var sParam = sUrl.match(regUrlParam);
		if (sParam) {
			var iStart = sUrl.indexOf(sParam + "=");
			var iEnd = sUrl.indexOf("&", iStart+1);

			if (iEnd==-1) iEnd=sUrl.length; else iEnd++;
			sUrl = sUrl.replace(sUrl.substring(iStart, iEnd), "")
		}
		return sUrl;
	}

	function addUrlParam(sUrl, sParamName, sParamValue) {
		if (sUrl.substr(sUrl.length-1, 1)!="&") sUrl += "&";

		sUrl += sParamName + "=" + encodeURIComponent(sParamValue);
		return sUrl;
	
	}

