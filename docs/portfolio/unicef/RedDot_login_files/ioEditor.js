		//JAVA-Scriptcode fuer ioEditor.asp

	var sScriptVersionEditor="5.123";

	var objEditorDoc=ioEditor.document;
	var objRange=null;
	var objLastRange=null;
	var objInfoLabelStyle=document.all("InfoLabel").style;								
	
	var OriginalData="";
	var OriginalHtmlData="";
	var sUncleanedHTMLData="";
	var HtmlMode="";
	var objDialogWindow=null;
	var objTableCell=null;
	var objTable=null;
	var SelFontFamily="";	
	var SelFontSize="";	
	var SelFontColor="#000000";	
	var objImage=null;
	var ScreenWidth=window.screen.width;
	var ScreenHeight=window.screen.height;
	var FlatStyle=false;
	var fCheckFormat=true;
	var fEnableHtmlView=true;
	var fKeyboardLocked=false;
	var iTextSize=0;	
	var iUndoCounter=-1;	
	var TempBuffer="";
	var InterV1=0;
	var InterV2=0;
	var InterV3=0;
	var UndoSourceCodeArray=new Array();
	var sAppVersion=String(top.clientInformation.appVersion);	
	var fIE4=(sAppVersion.indexOf("MSIE 4")>-1);
	var fIE5=(sAppVersion.indexOf("MSIE 5")>-1);
	var fIE6=(sAppVersion.indexOf("MSIE 6")>-1);
	var fTextOverflow=false;
	var fHTMLCodeCleaned=false;

	var iFontSizeIndex=1;
	//var FontSizeVarArray = new Array("xx-small","x-small","small","medium","large","x-large","xx-large");
	var FontSizeVarArray = new Array("10px","13px","16px","18px","24px","32px","48px");
	
	function removeStyleAssignment() {

		//Wenn kein Bereich markiert ist, setzt dich auf das parentElement und
		//entferne dort die Zuweisung
		var sHtmlText = objRange.htmlText;

		if (sHtmlText.length==0 ) { 
			var oElt = objRange.parentElement();
			oElt.removeAttribute("className"); 
			if (oElt.outerHTML.substr(0,6)=="<SPAN>") oElt.outerHTML = oElt.innerHTML;
			SetFocus();
			return; 
		}

		//Sorgt fuer das entfernen der von uns eingefuegten spans wenn diese nicht mit ausgewaehlt werden koennen
		//z.B. wenn sie den kompletten angezeigten Text umschliessen
		var fUseParentElem=false;
		if (objRange.parentElement().tagName=="SPAN")
			{ sHtmlText = objRange.parentElement().outerHTML; fUseParentElem=true; }

		//Erstmal alle spans entfernen.
		//Es werden auch solche entfernt die gar nicht durch eine Stylezuweisung entstanden sind
		var oSpan = /<span[^>]*>/gi;
		sHtmlText = sHtmlText.replace(oSpan, "");
		oSpan = /<\/span>/gi;
		sHtmlText = sHtmlText.replace(oSpan, "");

		//Jetzt noch eben die Klassenzuweisungen fuer alle anderen Elemente entfernen
		O = / class=[^"' >]*([ '">])/gi;
		sHtmlText = sHtmlText.replace(O, "$1");

		if (fUseParentElem)
			objRange.parentElement().outerHTML=sHtmlText;
		else
			objRange.pasteHTML(sHtmlText);

		SetFocus();
	}


	function KillError(Error,Url,Line)
		{	    		
	    return true;
		}
				
	window.onerror=KillError;
													
	function ShowInfoLabel()
		{
			objInfoLabelStyle.display="";			
		}
			
	function HideInfoLabel()
		{
			objInfoLabelStyle.display="none";			
		}

	function ChangeTextDirection()
		{
			if (sContentTextDirection=="LTR")
				{
					sContentTextDirection="RTL";
					document.all.btChangeTextDirection.value="ltr";
				}
			else
				{
					sContentTextDirection="LTR";
					document.all.btChangeTextDirection.value="rtl";
				}

			objEditorDoc.dir=sContentTextDirection;											
			
			SetFocus();
		}

	function SetFrameHeight()
		{var iOffset=0;

			if (iHideSecondBarEnd==1)
				iOffset=27;
			
			top.document.all.tags("IFRAME").item("ioEditor").style.height=document.body.offsetHeight-93+iOffset-iRedLiningFrameHeight;
		
			document.all("InfoLabel").style.left=document.body.offsetWidth/2-150;
			document.all("InfoLabel").style.top=document.body.offsetHeight/2-20;
			
		}
		
	function SetValue(sGuid,sValue)
		{			
			ioServerData.document.location="ioEditor/ioLoadServerText.asp?Guid=" + sGuid;
		}
		
	function OpenWindow(URL)
		{var fClosed=false;		 
		 var iWidth=660;
		 var iHeight=550;
		 var iLeft=ScreenWidth/2 - iWidth/2;
		 var iTop=ScreenHeight/2 - iHeight/2 - 25;		 
					
			if (objDialogWindow != null)
				{
					if (!objDialogWindow.closed)
						{
							objDialogWindow.close(); 
 							while (fClosed != objDialogWindow.closed)
 							  {
 							    fClosed = objDialogWindow.closed;
 							  }					
						}
 				} 						
			objDialogWindow=window.open(URL,"_blank",'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=' + iWidth + ',height=' + iHeight + ',screenX=' + iLeft + ',screenY=' + iTop + ',left=' + iLeft + ',top=' + iTop);			
		}
		
	function OpenWindowOnlineHelp(URL)
		{var fClosed=false;		 
		 var iWidth=590;
		 var iHeight=550;
		 var iLeft=window.screen.width/2 - iWidth/2;
		 var iTop=window.screen.height/2 - iHeight/2 - 25;		 
					
			if (objDialogWindow != null)
				{
					if (!objDialogWindow.closed)
						{
							objDialogWindow.close(); 
 							while (fClosed != objDialogWindow.closed)
 							  {
 							    fClosed = objDialogWindow.closed;
 							  }					
						}
 				} 						
			objDialogWindow=window.open(URL,"_blank",'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=' + iWidth + ',height=' + iHeight + ',screenX=' + iLeft + ',screenY=' + iTop + ',left=' + iLeft + ',top=' + iTop);			
		}

	function ReloadWatchdog()
		{
			ioWatchdog.document.location.reload();
		}	
	
	function CheckSession()
		{
			if (ioWatchdog.document.readyState == "complete")
				{var sUserGuid=ioWatchdog.document.ioCheckSession.UserGuid.value;
					
					if (sUserGuid == "0")
						{
							window.clearInterval(InterV1);
							window.clearInterval(InterV2);
							objEditorDoc.execCommand("SelectAll","","");
							objEditorDoc.execCommand("Copy","","");
							alert(ConvertToAscii(sLngId677));							
						}
				}
		}	
						
	function ResizeWindow()
		{
		 var iWidth=window.screen.width/1.2;
		 var iHeight=window.screen.height/1.2;
		 var iLeft=window.screen.width/2 - iWidth/2;
		 var iTop=window.screen.height/2 - iHeight/2 - 25;		 

			window.moveTo(iLeft,iTop);
			window.resizeTo(iWidth,iHeight);
		}
		
	function SetFontPreset()
		{
			SelFontFamily=document.Editor.BaseFontFace.value;
			SelFontSize=document.Editor.BaseFontSize.value;
			SelFontColor=String(document.Editor.BaseFontColor.value);												
			
			SetBaseFont();		
			
			//document.body.onmousedown=KillMouseEvent;
			//if (HtmlMode == "0")
				//objEditorDoc.body.onmousedown=CheckMouseEvent;	
				
			objEditorDoc.body.ondrop=StartCheckHtmlCode;									
			objEditorDoc.body.onkeydown=CheckKeyEvent;									
			//objEditorDoc.body.ondrop=KillDropEvent;			
			objEditorDoc.body.oncontextmenu=ShowPopupMenu;
			objEditorDoc.body.onmouseover=HidePopupMenu;
			
			StartSetFontPresetRedLining();
		}
		
	function SetBaseFont()
		{			
			if (HtmlMode == "0")
				SelFontFamily="Courier New";
			
			with (objEditorDoc.body.style)
				{
					if (SelFontFamily == "")
						SelFontFamily="Arial";
								
					fontFamily=SelFontFamily;
							
					if (SelFontSize == "")
						SelFontSize="3";
								
					iFontSizeIndex=Number(SelFontSize)-1;
					fontSize=FontSizeVarArray[iFontSizeIndex];
							
					fontStyle="normal";									
							
					var CheckSelFontColor=SelFontColor;	
					color=SelFontColor;
					
					if(CheckSelFontColor.toUpperCase() == "WHITE" || CheckSelFontColor.toUpperCase() == "#FFFFFF")
						backgroundColor="#C0C0C0";
						
					if (HtmlMode != "0")
						{
							var sFontCheckData=OriginalData.toUpperCase();
							if (sFontCheckData.indexOf(' COLOR=#FFFFFF')!=-1 || sFontCheckData.indexOf(' COLOR="#FFFFFF"')!=-1 || sFontCheckData.indexOf(' COLOR="WHITE"')!=-1)
								backgroundColor="#C0C0C0";
						}
				}

			//objEditorDoc.body.noWrap="noWrap";		
		}	

	function ShowPopupMenu()
		{			
			if (HtmlMode != "0")
				{
					objLastRange=objEditorDoc.selection.createRange();	

					var objParentElement=objRange.parentElement();
					var objElt=objParentElement;
					while (objParentElement.tagName != "BODY" && objParentElement.tagName != "BASEFONT" && objParentElement.tagName != "A" && objParentElement.tagName != "P" && objParentElement.tagName != "BR")
 						{ 		    						 					
 						  objParentElement=objParentElement.parentElement;	 				    
 						}							 				   				    		     				   				  			
			
					//document.all("PopupMenu2").disabled=(objParentElement.tagName != "A") || (document.all("btInsertLink")==null);
					document.all("PopupMenu1").disabled=!fEnableHtmlView;
					document.all("PopupMenu2").disabled=fEnableHtmlView;
			
					if (fEnableHtmlView)
						SetMenuColor(document.all("PopupMenu1"));
					else	
						SetMenuColor(document.all("PopupMenu2"));
					
					if (!fEnableHtmlView)
						{	 
							document.all("PopupMenu2").style.backgroundColor="#c0c0c0";
							document.all("PopupMenu2").style.color="#000000";
						}

					var objPopupMenu=document.all("PopupMenu").style;
			
					if (document.body.offsetWidth-objEditorDoc.parentWindow.event.clientX-120<0)
						objPopupMenu.left=objEditorDoc.parentWindow.event.clientX-120;			
					else
						objPopupMenu.left=objEditorDoc.parentWindow.event.clientX-10;			
						
					objPopupMenu.top=objEditorDoc.parentWindow.event.clientY+40+iRedLiningFrameHeight;			
					objPopupMenu.display="";
				}
			return false;
		}
			
	function EditLink()
		{
			HidePopupMenu();
			DialogInsertLink(objLastRange);
		}
	
	function SetMenuColor(This)
		{			
			var sActiveId=This.id;
			sActiveId=sActiveId.replace("PopupMenu","");
			
			for (var i=1;i<3;i++)
				{
					if (String(i)==sActiveId)
						{
							if (!document.all("PopupMenu" + String(i)).disabled)
								{
									document.all(This.id).style.backgroundColor="#000080";
									document.all(This.id).style.color="#ffffff";
								}
						}
					else
						{
							document.all("PopupMenu" + String(i)).style.backgroundColor="#c0c0c0";
							document.all("PopupMenu" + String(i)).style.color="#000000";
						}
				}
		}
		
	function HidePopupMenu()
		{
			document.all("PopupMenu").style.display="none";
		}
	
	function ShowHtmlCode()
		{
			document.all("btSaveDhtmlTextValue").style.display="none";
			document.all("btCacheSaveDhtmlTextValue").style.display="none";
			HidePopupMenu();
			if (document.all("PopupMenu1").disabled) return;
			
			var objHideInSourceView=top.document.all("HideInSourceView");
			for (var i=0;i<objHideInSourceView.length;i++)
				{
					objHideInSourceView(i).style.display="none";
				}

			if (top.document.all("TDHideFontSize"))
				top.document.all("TDHideFontSize").style.display="none";
					
			if (top.document.all("TDHideFontFace"))
				top.document.all("TDHideFontFace").style.display="none";	
				
			showStyleCombo("none");
			
			var objHideInNormalView=top.document.all("HideInNormalView");
			for (var i=0;i<objHideInNormalView.length;i++)
				{
					objHideInNormalView(i).style.display="";
				}						
			
			fEnableHtmlView=false;

			RemoveStyleAttributesFromImages();
			
			var sBuffer=objEditorDoc.body.innerHTML;			
			sBuffer=sBuffer.replace(/<DT>/g,"");
			sBuffer=sBuffer.replace(/<\/DT>/g,"");
			var sCrlf=String.fromCharCode(13,10);
			if (sBuffer.slice(0,2)==sCrlf)
				sBuffer=sBuffer.slice(2);

			objEditorDoc.body.innerText=sBuffer;			
			document.all.item("DivMaxSize").style.display="none";	
			
			objEditorDoc.dir="LTR";
			
			SetFocus();

		}	
	
	function RemoveStyleAttributesFromImages()
		{
			for (var i=0; i<objEditorDoc.images.length; i++)
				{
					objEditorDoc.images(i).style.width="";
					objEditorDoc.images(i).style.height="";
				}
		}
	
	function RepareURLs(sData)
		{			
			var objTempDoc=top.frames.ioTempData.document;
			objTempDoc.open();
			
			if (sData==null)
				{
					objTempDoc.write(objEditorDoc.body.innerText);
					
					var sBuffer=objEditorDoc.body.innerText;					
					if (sBuffer.slice(0,3).toUpperCase()!="<DT" && sBuffer.indexOf("<")>-1)
						sBuffer="<DT></DT>" + sBuffer;
					
					sUncleanedHTMLData=sBuffer;							
					//objEditorDoc.body.innerHTML=objEditorDoc.body.innerText;							
					objEditorDoc.body.innerHTML=sBuffer;							
				}
			else
				{
					sUncleanedHTMLData=sData;
					objTempDoc.write(sData);
					objEditorDoc.body.innerHTML=sData;
				}
				
			objTempDoc.close();
			
			for (var i = 0; i<objTempDoc.links.length; i++)
				{															
					var sCheckHref=objTempDoc.links.item(i).outerHTML;
					var iPos1=sCheckHref.indexOf('href="');
								
					if (iPos1>-1)
						{
							sCheckHref=sCheckHref.slice(iPos1+6);
							iPos1=sCheckHref.indexOf('"');								
							if (iPos1>-1)
								{
									sCheckHref=sCheckHref.slice(0,iPos1);																		
									objEditorDoc.links.item(i).href=sCheckHref;									
								}
						}		
				}											

			for (var i = 0; i<objTempDoc.images.length; i++)
				{															
					var sCheckSrc=objTempDoc.images.item(i).outerHTML;
					var iPos1=sCheckSrc.indexOf('src="');
									
					if (iPos1>-1)
						{
							sCheckSrc=sCheckSrc.slice(iPos1+5);
							iPos1=sCheckSrc.indexOf('"');								
							if (iPos1>-1)
								{
									sCheckSrc=sCheckSrc.slice(0,iPos1);			
									objEditorDoc.images.item(i).src=sCheckSrc;
								}	
						}
				}							
		}

	function RepareLink(objLink)
		{
			var sSearchValue="";
			var sHref="";
			var iPos=0;
			var	sBaseFontColor=String(document.Editor.BaseFontColor.value);
			var sBaseFontSize=String(document.Editor.BaseFontSize.value)
			
			objLink.href=objLink.href.replace("&TempSaved=1","");
			
			if (objLink.href == "http://#" || objLink.href == "http:///#")																	
				objLink.href="#";																		  						  
			else 
				{
					sSearchValue="FontSize=" + sBaseFontSize + "&FontColor=" + sBaseFontColor;
					sHref=objLink.href;
					iPos=sHref.indexOf(sSearchValue);
					if (iPos>-1)
						{							
							iPos=iPos + sSearchValue.length;
							objLink.href=sHref.slice(iPos);																		  						  
						}
							
					sSearchValue="FontSize=" + sBaseFontSize + "&amp;FontColor=" + sBaseFontColor;
					sHref=objLink.href;
					iPos=sHref.indexOf(sSearchValue);
					if (iPos>-1)
						{							
							iPos=iPos + sSearchValue.length;
							objLink.href=sHref.slice(iPos);																		  						  
						}

					sSearchValue="/ioEditor/";	
					sHref=objLink.href;
					iPos=sHref.indexOf(sSearchValue);
					if (iPos>-1)
						{							
							iPos=iPos + sSearchValue.length;
							objLink.href=sHref.slice(iPos);																		  						  
						}
					else//sicherheitshalber auf RedDot-Server URL pruefen
						{
							iPos=objLink.href.indexOf("://");
							if (iPos>-1)
								{
									var sHost=objLink.href.slice(iPos+3);
									iPos=sHost.indexOf("/");
									if (iPos>-1)
										{
											var sNewHref=sHost.slice(iPos);
											sHost=sHost.slice(0,iPos);
											if (sHost==top.document.location.hostname || sHost==top.document.location.host)//Pruefen, ob Link absolut referenziert im Originaltext steht
												{
													sSearchValue='href="' + objLink.href + '"';
													if (sUncleanedHTMLData.indexOf(sSearchValue)==-1)//Link reparieren
														objLink.href=(sNewHref);
												}
										}
								}
						}	
				}	
		
		}

	function ShowStandardText()
		{
			document.all("btSaveDhtmlTextValue").style.display="";
			document.all("btCacheSaveDhtmlTextValue").style.display="";
			HidePopupMenu();
			if (document.all("PopupMenu2").disabled) return;						

			var objHideInSourceView=top.document.all("HideInSourceView");
			for (var i=0;i<objHideInSourceView.length;i++)
				{
					objHideInSourceView(i).style.display="";
				}

			if (top.document.all("TDHideFontSize"))
				top.document.all("TDHideFontSize").style.display="";
					
			if (top.document.all("TDHideFontFace"))
				top.document.all("TDHideFontFace").style.display="";	
				
			showStyleCombo("");

			var objHideInNormalView=top.document.all("HideInNormalView");
			for (var i=0;i<objHideInNormalView.length;i++)
				{
					objHideInNormalView(i).style.display="none";
				}						

			fEnableHtmlView=true;					
			RepareURLs();			

			if (iTextSize>0) 
				document.all.item("DivMaxSize").style.display="";	
			
			RemoveStyleAttributesFromImages();
			StartCheckHtmlCode();
			
			objEditorDoc.dir=sContentTextDirection;
			
			SetFocus();
		}
	
	function KillDropEvent()
		{			
			return false;
		}
														
	function KillMouseEvent()
		{			
			if (window.event.button==2)//Popupmenue sperren!
				alert('RedDot');				
		}

	function CheckMouseEvent()
		{			
			if (ioEditor.window.event.button==2)//Popupmenue sperren!
				alert('RedDot');				
		}

	function CheckKeyEvent()
		{			
			if (fKeyboardLocked)
				return false;
			
			var objEvent=ioEditor.window.event;
			
			if (objEvent.keyCode==9 && HtmlMode != "0" && !document.all("btTabPlus"))
				return false;
						
 			if (objEvent.keyCode==13 || objEvent.keyCode==32)
 					AddToUndoBuffer();	
			
			if (objEvent.keyCode==9 && objEvent.shiftKey)	
				{
					if (HtmlMode != "0")
						TabMinus();
					else
						TabMinusAscii();
					return false;
				}
			else if (objEvent.keyCode==9)
				{
					if (HtmlMode != "0")
						TabPlus();
					else
						TabPlusAscii();
					return false;
				}
			else if (objEvent.keyCode==87 && objEvent.ctrlKey)//Strg+W abfangen
				{
						return false;
				}
			else if (objEvent.keyCode==78 && (!objEvent.altKey && objEvent.ctrlKey))//Strg+N abfangen
				{
						return false;
				}
			else if (objEvent.keyCode==85 && objEvent.ctrlKey)//Strg+U abfangen
				{
					if (document.Editor.btUnderline == null)
						return false;
				}
			else if (objEvent.keyCode==73 && objEvent.ctrlKey)//Strg+I abfangen
				{
					if (document.E2ditor.btItalic == null)
						return false;
				}
			else if (objEvent.keyCode==66 && objEvent.ctrlKey)//Strg+B abfangen
				{
					if (document.Editor.btBold == null)
						return false;
				}
			else if (objEvent.keyCode==90 && (!objEvent.altKey && objEvent.ctrlKey))//Undo abfangen	
				{
					if (HtmlMode=="1" && !fEnableHtmlView)
						return false;
					else
						{
							Undo();
							return false;
						}
				}
			else if (objEvent.keyCode==89 && (!objEvent.altKey && objEvent.ctrlKey))//Redo abfangen	
				{
					if (HtmlMode=="1" && !fEnableHtmlView)
						return false;
					else
						{
							Redo();
							return false;
						}
				}
			else if (objEvent.keyCode==86 && objEvent.ctrlKey || objEvent.keyCode==45 && objEvent.shiftKey)//Paste	abfangen
				{
					if (HtmlMode == "0" || !fEnableHtmlView)//Formatierung entfernen
						{
							ExecCommand("Paste", "");									
							return false;
						}					
					else
						{
							StartCheckHtmlCode();//unerlaubte Zeichen und Objekte entfernen
						}	
				}
			else if (objEvent.keyCode==13 && !objEvent.shiftKey && (HtmlMode == "0" || !fEnableHtmlView))//Harten Zeilenumbruch in weichen Zeilenumbruch umbiegen
				{					
					var objRange=objEditorDoc.selection.createRange();		 
 					objRange.text=objRange.text + String.fromCharCode(13);
 					objRange.moveStart("Character",0);
 					objRange.moveEnd("Character",0);
 					objRange.select();
 					return false;
 				}	
		}
		
	function ShowOpener()
		{
			top.opener.top.focus();
		}	
	
	function HideOpener()
		{
			top.opener.top.blur();
		}
																	
	function Init(HtmlModeA, KeyA, TextSizeA)
		{					
			window.setInterval("HideOpener()",50);										
			var HtmlDataA=document.all("EditorData").value;	
			ResizeWindow();							
			SetFrameHeight();
			HtmlMode=HtmlModeA;						
			iTextSize=TextSizeA;
			DesignModeOn();						
			objEditorDoc.open();
			objEditorDoc.write("");
			objEditorDoc.close();				

			if (document.all.ScriptVersionEditor.value!=sScriptVersionEditor)
				{
					alert("Old script version found. Please clear browser cache.");
					top.window.close();
				}
			
			if (TempBuffer=="")
				{
					if (HtmlDataA == "")
						{
							OriginalData="";
						}
					else
						{								
							OriginalData=unescape(HtmlDataA);
						}	
				}
			else
				{
					OriginalData=TempBuffer;
				}																					
			
			if (HtmlMode != "0")
				{ 
					if (OriginalData.slice(0,3).toUpperCase()!="<DT" && OriginalData.indexOf("<")>-1)
						OriginalData="<DT></DT>" + OriginalData;

					LoadHtmlText();										
				}
			else
				{		
					var objHideInNormalView=top.document.all("HideInNormalView");
					for (var i=0;i<objHideInNormalView.length;i++)
						{
							objHideInNormalView(i).style.display="";
						}						
					LoadAsciiText();
				}																
			FlatStyle=document.Editor.FlatStyle.value;
			SetFontPreset();
			CheckFontSettings();
			OriginalHtmlData=objEditorDoc.body.innerHTML;
			InterV1=window.setInterval("ReloadWatchdog()",300000);
			InterV2=window.setInterval("CheckSession()",150000);
			AddToUndoBuffer();
			document.all("BusyLabel").style.display="none";
			if (document.all("TDHideFontFace")!=null)
				document.all("TDHideFontFace").style.display="";
			if (document.all("TDHideFontSize")!=null)	
				document.all("TDHideFontSize").style.display="";						

			showStyleCombo("");

			if (iTextSize>0) 
				document.all.item("DivMaxSize").style.display="";	
			
			if (HtmlMode == "0")
				top.document.body.style.display="";	
			
			SetFocus();
		}

	function showStyleCombo(sDisplay) 
		{
			if (HtmlMode=="1")
				{
					if (document.Editor.CssComboHidden.options.length>0) 
						{
							document.all("TDCssImage").style.display=sDisplay;
							document.all("TDCssCombo").style.display=sDisplay;
						}
					else 
						{
							document.all("TDCssImage").style.display="none";
							document.all("TDCssCombo").style.display="none";
						}
				}
		}
	
	
	function DoNotCheckFormat()
		{
			fCheckFormat=false;
		}
			
	function CheckFormat()
		{
			fCheckFormat=true;
		}


	function selectStyleSheet(sTagName, sClassName) {
		var oStyles = document.Editor.CssCombo;
		var sStyleClassName="";
		if (sClassName.length==0) { oStyles.selectedIndex=-1; return; }
		for (var i=0; i<oStyles.options.length; i++) {
			sStyleClassName = oStyles.options[i].value;
			sStyleClassName = sStyleClassName.substr(sStyleClassName.indexOf(".")+1);
			if (sStyleClassName==sClassName) { oStyles.selectedIndex=i; break; }
		}
		
	}
	
				
	var sOldElement="";
	function CheckFontSettings()		
		{			
			var objElt=null;

			if (iTextSize > 0)
				{var sText=objEditorDoc.body.innerText;
										
					document.all.item("MaxSizeInfo").value=String(iTextSize-sText.length);
					fTextOverflow=(sText.length > iTextSize);
					
					if (fTextOverflow)
						document.all.item("MaxSizeInfo").style.color="#ff0000";
					else
						document.all.item("MaxSizeInfo").style.color="#000000";
				}
			else
				fTextOverflow=false;	
				
			if (fCheckFormat)
				{					
					objRange=objEditorDoc.selection.createRange();		 
				 			 
				  if (objEditorDoc.selection.type != "Control" && fEnableHtmlView)
						{
							var fBold=objRange.queryCommandValue("Bold");			
							var fItalic=objRange.queryCommandValue("Italic");			
							var fUnderline=objRange.queryCommandValue("Underline");			
							var FontSize=objRange.queryCommandValue("FontSize");			
							var FontName=objRange.queryCommandValue("FontName");			

							objElt = objRange.parentElement();
							if (document.Editor.CssComboHidden.options.length>0 && sOldElement!=(objElt.tagName + objElt.className))
								{
									sOldElement=objElt.tagName + objElt.className;
									UpdateSetStyleSheetClassList(document.Editor.CssCombo.value);
									selectStyleSheet(objElt.tagName, objElt.className);
								}

							if (document.Editor.cmbFontName != null)
								{
									document.Editor.cmbFontName.value=FontName;				
								}	

							if (document.Editor.cmbFontSize != null)
								{
									if (document.Editor.cmbFontSize.value != FontSize)
										document.Editor.cmbFontSize.value=FontSize;
								}

							if (FlatStyle == 0)
								{
									for (var i=1; i<7; i++)
										{
											if (objElt.tagName=="H"+String(i))
												{
													BtInset2("btInsertHR"+String(i));
													fBold=false;
												}
											else
												BtDown2("btInsertHR"+String(i));																							
										}

									if (fBold)
										BtInset2("btBold");
									else
										BtDown2("btBold");
									if (fItalic)
										BtInset2("btItalic");
									else
										BtDown2("btItalic");
									if (fUnderline)
										BtInset2("btUnderline");
									else
										BtDown2("btUnderline");									
								}
							else
								{
									for (var i=1; i<7; i++)
										{
											if (objElt.tagName=="H"+String(i))
												{
													BtInset("btInsertHR"+String(i));
													fBold=false;
												}
											else
												BtDown("btInsertHR"+String(i));																							
										}

									if (fBold)
										BtInset("btBold");
									else	
										BtDown("btBold");
									if (fItalic)
										BtInset("btItalic");
									else	
										BtDown("btItalic");
									if (fUnderline)
										BtInset("btUnderline");
									else	
										BtDown("btUnderline");
								}
						}
				}
			setTimeout("CheckFontSettings()",500);
		}				
	
	function UpdateSetStyleSheetClassList(sCurrentValue)
		{		
			var objCssCombo=top.document.all.CssCombo; 
			var objCssComboHidden=top.document.all.CssComboHidden;
			var iIndexSelected=-1;

			objCssCombo.innerHTML="";

			if (objEditorDoc.selection.type == "Control")
				var objElt=objRange.item(0); 									
			else
				var objElt=objRange.parentElement();		 									

			for (var i=0; i<objCssComboHidden.length; i++)
				{															
					var fAdd=true;
					var sValue=objCssComboHidden.options[i].value;
					
					if (sValue.indexOf(".")>-1)//Klasse darf nur auf bestimmte Tagobjekte angewendet werden!
						{
							var sClassTagName=sValue.slice(0,sValue.indexOf("."));							
							fAdd=(objElt.tagName==sClassTagName.toUpperCase());
						}

					if (fAdd)
						{
							if (sValue==sCurrentValue) iIndexSelected = objCssCombo.options.length;
							objCssCombo.options[objCssCombo.options.length]=new Option(objCssComboHidden.options[i].text, sValue, false, false);
						}
				}			

			objCssCombo.selectedIndex=iIndexSelected;

		}
	
	function SetStyleSheetClass(sClassName) {	
			var objRange=objEditorDoc.selection.createRange();		 
			var sHtmlText = objRange.htmlText;

			var iPos=(sClassName.indexOf("."));
			if (iPos>-1)//Tag-Prefix entfernen
				sClassName=sClassName.slice(iPos+1);

			AddToUndoBuffer();
			if (sHtmlText.length==0 ) { 
				var oElt = objRange.parentElement();
				oElt.setAttribute("className", sClassName); 
				SetFocus();
				return; 
			}
			else {
				sHtmlText = "<span class=\"" + sClassName + "\">" + sHtmlText + "</span>";
				objRange.pasteHTML(sHtmlText);				
				objRange.select();								
				SetFocus();	
			}
	}

	function LoadStyleSheets()
		{
			objEditorDoc.createStyleSheet();
			
			var sStyles=document.Editor.EditorCssStyle.value;
			var sRules=document.Editor.EditorCssRule.value;
			
			var RulesArray=sRules.split("|");
			var StylesArray=sStyles.split("|");
			
			for (var i=0; i<RulesArray.length; i++)
				{
					if (RulesArray[i]!="" && RulesArray[i].indexOf(",")==-1)
						objEditorDoc.styleSheets[0].addRule(RulesArray[i],StylesArray[i]);
					else
						{
							if (RulesArray[i].indexOf(",")!=-1)	
								{
									var RulesSubArray=RulesArray[i].split(",");
									for (var i2=0; i2<RulesSubArray.length; i2++)
										{
											if (RulesSubArray[i2]!="")
												objEditorDoc.styleSheets[0].addRule(RulesSubArray[i2],StylesArray[i]);
										}
								}
						}
				}			
		}
	
	function LoadHtmlText()
		{
			sUncleanedHTMLData=OriginalData;
			objEditorDoc.open();			
			objEditorDoc.write(OriginalData);			
			objEditorDoc.close();			

			for (var i=0;i<objEditorDoc.anchors.length;i++)
				{
					if (objEditorDoc.anchors.item(i).href == "" || objEditorDoc.anchors.item(i).href == "http://#" || objEditorDoc.anchors.item(i).href == "http:///#")
						{							
							var sInnerHTML=objEditorDoc.anchors.item(i).innerHTML;
							var sInnerText=objEditorDoc.anchors.item(i).innerText;
							//objEditorDoc.anchors.item(i).innerText="#" + objEditorDoc.anchors.item(i).innerText;	


							try
								{
									objEditorDoc.anchors.item(i).innerHTML="#" + sInnerHTML;
								}
							catch (e) {}	


							objEditorDoc.anchors.item(i).setAttribute("href","#");														
						}		
				}
			LoadStyleSheets();
			objEditorDoc.dir=sContentTextDirection;			
			StartCheckHtmlCode();//unerlaubte Zeichen und Objekte entfernen			

			SetFocus();											
		}	
	
	function LoadAsciiText()
		{	
			objEditorDoc.open();
			objEditorDoc.write("");
			objEditorDoc.close();
			objEditorDoc.body.innerText=OriginalData;			
			objEditorDoc.dir=sContentTextDirection;																	
			SetFocus();											
		}	

	function TabPlus()
		{objRange=objEditorDoc.selection.createRange();		 
		 var objElt=null;	
		 var TagName="";		 
		 var iY=objRange.boundingTop;
					
			AddToUndoBuffer();		
			if(objRange.parentElement != null)
				{					
					objElt=objRange.parentElement();		 									
					while (objElt.tagName != "BLOCKQUOTE" && objElt.tagName != "P" && objElt.tagName != "OL"  && objElt.tagName != "UL" && objElt.tagName != "BODY" && objElt.tagName != "BASEFONT")
 						{ 		    
 						  objElt=objElt.parentElement;	 				    
 						}							 				   				    		     				   				  

 				  if (objElt.tagName != "BODY" && objElt.tagName != "BASEFONT")
 						{
 							TagName=objElt.tagName;
 							var objParentElt=objElt.parentElement;

 							if (TagName == "BLOCKQUOTE")
 								{
 									objElt.outerHTML="<BLOCKQUOTE>" + objElt.outerHTML + "</BLOCKQUOTE>";		 								
 								}
 							else	
 								{
									objElt.outerHTML="<BLOCKQUOTE>" + objElt.innerHTML + "</BLOCKQUOTE>";		 								
 								}
 						}	
 					else
 						{
 							objElt.innerHTML="<BLOCKQUOTE>" + objElt.innerHTML + "</BLOCKQUOTE>";		 	
 						}	 					 					
 				}  			
 			SetFocus();			
 			objRange.moveToPoint(0,iY); 			
 			objRange.select();
		}
	
	function TabMinus()
		{
			objRange=objEditorDoc.selection.createRange();		 
			var objElt=null;	
			var TagName="";
			var iY=objRange.boundingTop;

			AddToUndoBuffer();
			if(objRange.parentElement != null)
				{
					objElt=objRange.parentElement();		 									
					while (objElt.tagName != "BLOCKQUOTE" && objElt.tagName != "BODY" && objElt.tagName != "BASEFONT")
 						{ 		    
 						  objElt=objElt.parentElement;	 				    
 						}							 				   				   				  

 				  if (objElt.tagName == "BLOCKQUOTE")
 						{
 							objElt.outerHTML=objElt.innerHTML;
 						}	
 				} 
 			SetFocus();												
 			objRange.moveToPoint(0,iY); 			
 			objRange.select();
		}

	function SetIndex()
		{objRange=ioEditor.document.selection.createRange();		 
		 var RangeHtmlText=objRange.htmlText;				 		
		 
		  AddToUndoBuffer();
			RangeHtmlText='<!ioIndex><font color=#000080>' + RangeHtmlText + '</font><!/ioIndex>';								
			
			//objRange.pasteHTML(RangeHtmlText);			
			objRange.pasteHTML("{*}");			
			var HTMLText=ioEditor.document.body.innerHTML;
			HTMLText=HTMLText.replace("{*}",RangeHtmlText);
			ioEditor.document.body.innerHTML=HTMLText;
		}
				
	function ExecCommand(sCommand, sValue)		
		{						 	
			SetFocus();
			AddToUndoBuffer();
			fCheckFormat=true;

			if (sCommand == "FontName")
				{
					SelFontFamily=sValue;		 			
				}						
			if (sCommand == "Paste" && (fIE5 || fIE6))
				{
					objRange=ioEditor.document.selection.createRange();
					objRange.text=window.clipboardData.getData("Text");
				}
			else if(sCommand == "Print")
				objEditorDoc.execCommand(sCommand,"",sValue);														
			else if (sCommand == "InsertUnorderedList")
				{objRange=ioEditor.document.selection.createRange();		 
				 var RangeHtmlText=objRange.htmlText;
												
						if (RangeHtmlText == "")
							{
								objRange.text=" ";
								objRange.expand();
								objRange.moveStart("Character",-1);								
								objRange.select();								

								if (sValue=="")
									RangeHtmlText="<UL><LI></LI></UL>";				 		
								else
									RangeHtmlText='<UL type="' + sValue + '"><LI></LI></UL>';				 			
								objRange.pasteHTML(RangeHtmlText);			
							}
						else
							{
								objEditorDoc.execCommand(sCommand,"","");	
								var objParent=objRange.parentElement();
								if (sValue!="")									
									objParent.parentElement.setAttribute("type",sValue);
								SetFocus();	
							}	
				}
			else if (sCommand == "InsertOrderedList")
				{objRange=ioEditor.document.selection.createRange();		 
				 var RangeHtmlText=objRange.htmlText;
						
						if (RangeHtmlText == "")
							{
								objRange.text=" ";
								objRange.expand();
								objRange.moveStart("Character",-1);								
								objRange.select();								

								if (sValue=="")
									RangeHtmlText="<OL><LI></LI></OL>";
								else
									RangeHtmlText='<OL type="' + sValue + '"><LI></LI></OL>';				 			
												 		
								objRange.pasteHTML(RangeHtmlText);			
							}
						else
							{
								objEditorDoc.execCommand(sCommand,"","");	
								var objParent=objRange.parentElement();
								if (sValue!="")
									objParent.parentElement.setAttribute("type",sValue);
								SetFocus();	
							}	
				}
			else
				{
					if (objEditorDoc.selection.type != "Control")
						{
							if (sCommand == "Unlink")
								{var objParentElement=objRange.parentElement();
								 var sText=objParentElement.innerText;	
								 
									if (sText.slice(0,1) == "#")
										{
											var sHtml=objParentElement.innerHTML;
											objParentElement.innerHTML=sHtml.slice(1);											
										}
								}
						}
					objRange.execCommand(sCommand,"",sValue);	
					
					if (sCommand == "RemoveFormat")
						removeStyleAssignment();					
								
					SetFocus();	
				}
			
			AddToUndoBuffer();	
			//SetFocus();											
		}		
	
	function NewText() 
		{						
			AddToUndoBuffer();
			OriginalData="";	
			sUncleanedHTMLData="";
			objEditorDoc.open();
			objEditorDoc.write("");
			objEditorDoc.close();
			SetFontPreset();
			LoadStyleSheets();
			objEditorDoc.dir=sContentTextDirection;
			
			SetFocus();									
		}
	
	function SetFocus()
		{
			frames.ioEditor.focus();					
		}
	

	function Save(iCacheSave)
		{					
			if (fTextOverflow)
				{
					alert(ConvertToAscii(sLngId3442));
					return;
				}
				
			RemoveStyleAttributesFromImages();

			if (!fEnableHtmlView && HtmlMode == "1")				
				RepareURLs();			
									
			for (var i = 0; i<objEditorDoc.links.length; i++)
				{										
					RepareLink(objEditorDoc.links.item(i));					
				}														
						
			if (document.all("TDHideFontFace")!=null)		
				document.all("TDHideFontFace").style.display="none";
			if (document.all("TDHideFontSize")!=null)		
				document.all("TDHideFontSize").style.display="none";					

			showStyleCombo("none");

			document.all("SaveLabel").style.display="";			
			if (objEditorDoc != null)
				{
					if (objEditorDoc.body != null)
						{var objTextBuffer=document.all.item("EltValue");	
							
							//objEditorDoc.execCommand("SelectAll","","");
							//objEditorDoc.execCommand("Copy","","");
							
							if (HtmlMode == "1")
								{var TextBuffer="";
								 var TextBuffer1="";
								 var TextBuffer2="";
								 var iPos=-1;
																		
									var objTable=objEditorDoc.all.tags("TABLE");
									for (var i=0;i<objTable.length;i++)//Tabellen fuer Netscape-Browser anpassen
										{
											var sHeight=objTable(i).style.height;
											var sWidth=objTable(i).style.width;
											
											if (sHeight!="")
												{
													objTable(i).style.height="";  
													objTable(i).height=sHeight;  
												}
											if (sWidth!="")
												{
													objTable(i).style.width=""; 
													objTable(i).width=sWidth; 
												}
										}
																			
									for (var i=0;i<objEditorDoc.images.length;i++)//Bildgroessen fuer Netscape-Browser anpassen
										{
											var sHeight=objEditorDoc.images(i).style.height;
											var sWidth=objEditorDoc.images(i).style.width;
											
											if (sHeight!="")
												{
													sHeight=sHeight.replace("px","");
													sWidth=sWidth.replace("px","");
													objEditorDoc.images(i).height=sHeight;
													objEditorDoc.images(i).width=sWidth;													
												}											
										}
									
									for (var i=0;i<objEditorDoc.anchors.length;i++)
										{
											var sText=objEditorDoc.anchors.item(i).innerText;	
											if (sText.slice(0,1) == "#")
												{													
													objEditorDoc.anchors.item(i).removeAttribute("href");														
													var sInnerHtml=objEditorDoc.anchors.item(i).innerHTML;															
													if (sInnerHtml.slice(0,1) == "#")
														sInnerHtml=sInnerHtml.slice(1);
														
													objEditorDoc.anchors.item(i).innerText=sText.slice(1);
													objEditorDoc.anchors.item(i).innerHTML=sInnerHtml;
												}	
										}
																		
									
									TextBuffer=objEditorDoc.body.innerHTML;																										
									TextBuffer=TextBuffer.replace(/<DT>/g,"");
									TextBuffer=TextBuffer.replace(/<\/DT>/g,"");									
									var sCrlf=String.fromCharCode(13,10);
									if (TextBuffer.slice(0,2)==sCrlf)
										TextBuffer=TextBuffer.slice(2);
						
									objTextBuffer.value=escape(TextBuffer);					
								}
							else
								{
									objTextBuffer.value=escape(objEditorDoc.body.innerText);													
								}		
						}
				}

			if (iCacheSave)//Text speichern und Editor geöffnet lassen
				{
					top.document.body.onunload="";//onunload-event killen
					var sRedirectURL=top.document.location.href;
					if (sRedirectURL.indexOf("TempSaved=1")==-1)
						{
							if (sRedirectURL.indexOf("?")==-1)
								sRedirectURL=sRedirectURL + "?TempSaved=1";
							else
								sRedirectURL=sRedirectURL + "&TempSaved=1";	
						}
					document.Editor.RedirectUrl.value=sRedirectURL;
				}
			else	
				document.Editor.RedirectUrl.value="";	
			
			sTempSaved="0";//RESET!
			document.Editor.submit();			
		}
		
	function SelectListType()
		{
			var objDialogDoc=null;
			var fClosed=false;		 
			var iLeft=ScreenWidth/2 - 150;
			var iTop=ScreenHeight/2 - 125;
						
			AddToUndoBuffer();
			if (objDialogWindow != null)
				{
					objDialogWindow.close(); 
 					while (fClosed != objDialogWindow.closed)
 					  {
 					    fClosed = objDialogWindow.closed;
 					  }					
 				} 						
			objDialogWindow=window.open("","","resizable=yes, width=300, height=230, left=" + iLeft + ", top=" + iTop); 							
			objDialogDoc=objDialogWindow.document;			
			objDialogDoc.open();			
			objDialogDoc.write(ioDialogListType.document.body.outerHTML);
			CreateDialogStyleSheet(objDialogDoc);			
			objDialogDoc.title=sLngId5022;
			objDialogDoc.close();
			objDialogDoc.body.style.display="";					
		}
				
	function DialogInsertTable()
		{var objDialogDoc=null;
		 var fClosed=false;		 
		 var iLeft=ScreenWidth/2 - 200;
		 var iTop=ScreenHeight/2 - 300;
						
			if (objEditorDoc.selection.type != "Control")			
				{
					objRange = objEditorDoc.selection.createRange();		  		 		 									
			
					if(objRange.parentElement != null)
						{
							var objParent=objRange.parentElement();		 									
							if (objParent.id == "btInsertTable" || objParent.id == "HideInSourceView")
								{
									SetFocus();
									return;
								}
						}
						
					AddToUndoBuffer();
					if (objDialogWindow != null)
						{
							objDialogWindow.close(); 
 							while (fClosed != objDialogWindow.closed)
 							  {
 							    fClosed = objDialogWindow.closed;
 							  }					
 						} 						
					objDialogWindow=window.open("","","resizable=yes, width=400, height=520, left=" + iLeft + ", top=" + iTop); 							
					objDialogDoc=objDialogWindow.document;			
					objDialogDoc.open();			
					objDialogDoc.write(ioDialogInsertTable.document.body.outerHTML);
					CreateDialogStyleSheet(objDialogDoc);			
					objDialogDoc.title=sLngId681;
					objDialogDoc.close();
					objDialogDoc.body.style.display="";					
					objDialogDoc.all("btinit").click();
				}
			else
				SetFocus();						
								
		}

	function EditProperties()
		{var objDialogDoc=null;
		 var fClosed=false;		 
		 var iHeight=525;
		 var iWidth=460;
		 var iLeft=ScreenWidth/2 - iWidth/2;
		 var iTop=ScreenHeight/2 - iHeight/2;

			AddToUndoBuffer();
			if (objDialogWindow != null)
				{
					objDialogWindow.close(); 
 					while (fClosed != objDialogWindow.closed)
 					  {
 					    fClosed = objDialogWindow.closed;
 					  }					
 				} 						
			objDialogWindow=window.open("","","fullscreen=no, width=" + iWidth + ", height=" + iHeight +", left=" + iLeft + ", top=" + iTop); 							
			objDialogDoc=objDialogWindow.document;			
			objDialogDoc.open();			
			objDialogDoc.write(ioDialogDocumentProperties.document.body.outerHTML);
			CreateDialogStyleSheet(objDialogDoc);			
			objDialogDoc.title=sLngId683;						
			objDialogDoc.close();
			objDialogDoc.body.style.display="";					
			objDialogDoc.all("btinit").click();
								
		}
	
	function DialogFormatTable()
		{var objDialogDoc=null;
		 var fClosed=false;		 		 		 
		 var iLeft=ScreenWidth/2 - 275;
		 var iTop=ScreenHeight/2 - 210;
			
			if (objEditorDoc.selection.type != "Control")
				{
					AddToUndoBuffer();
					objRange = objEditorDoc.selection.createRange();		  		 		 									
			
					if(objRange.parentElement != null)
						{							
							objTableCell=objRange.parentElement();		 									

							while (objTableCell.tagName != "TD" && objTableCell.tagName != "BODY" && objTableCell.tagName != "BASEFONT")
 								{ 		    
 								  objTableCell=objTableCell.parentElement;		  		    
 								}					

							objTable=objTableCell;
							while (objTable.tagName != "TABLE" && objTable.tagName != "BODY" && objTable.tagName != "BASEFONT")
 								{ 		    
 								  objTable=objTable.parentElement;		 
 								}					

							if (objDialogWindow != null)
								{
									objDialogWindow.close(); 
 									while (fClosed != objDialogWindow.closed)
 									  {
 									    fClosed = objDialogWindow.closed;
 									  }					
 								}  			
 							if (objTableCell.tagName == "TD" && objTableCell.id != "btFormatTable" && objTableCell.id != "HideInSourceView")							
								{				 
									objDialogWindow=window.open("","","resizable=yes, width=550, height=345, left=" +iLeft + ", top=" + iTop); 							
									objDialogDoc=objDialogWindow.document;			
									objDialogDoc.open();									
									objDialogDoc.write(ioDialogFormatTable.document.body.outerHTML);
									CreateDialogStyleSheet(objDialogDoc);			
									objDialogDoc.title=sLngId686;															
									objDialogDoc.close();
									objDialogDoc.all.TableFormat.style.display="none";											
									objDialogDoc.body.style.display="";											
									objDialogDoc.all("btinit").click();
								}											
							else
								{
									SetFocus();
								}					
						}
				}					
			else			
				{
					var objRange=objEditorDoc.selection.createRange();
					objTable=objRange.item(0);
					objTableCell=null;
					
					if (objTable.tagName == "TABLE")
						{
							AddToUndoBuffer();

							if (objDialogWindow != null)
								{
									objDialogWindow.close(); 
 									while (fClosed != objDialogWindow.closed)
 									  {
 									    fClosed = objDialogWindow.closed;
 									  }					
 								}  			

							objDialogWindow=window.open("","","resizable=yes, width=550, height=365, left=" +iLeft + ", top=" + iTop); 							
							objDialogDoc=objDialogWindow.document;			
							objDialogDoc.open();									
							objDialogDoc.write(ioDialogFormatTable.document.body.outerHTML);
							CreateDialogStyleSheet(objDialogDoc);			
							objDialogDoc.title=sLngId686;															
							objDialogDoc.close();
							objDialogDoc.all.TableCellFormats.style.display="none";											
							objDialogDoc.body.style.display="";											
							objDialogDoc.all("btinit").click();
						}
					else	
						SetFocus();
				}
		}
				
	function DialogInsertLink(objRangeA)
		{
			var objDialogDoc=null;
			var fClosed=false;		 
			var fEditLink=false;
			var sTarget="";
			var sHref="";		 		 		 
			var sAttributeGuid="";
			var sTitle="";
			var iLeft=ScreenWidth/2 - 225;
			var iTop=ScreenHeight/2 - 150;
			
			AddToUndoBuffer();
			if (objEditorDoc.selection.type != "Control")
				{
				
					if (objRangeA==null)
						objRange = objEditorDoc.selection.createRange();		  		 		 
					else	
						objRange = objRangeA;
						
					var objParentElement=objRange.parentElement();
					var objElt=objParentElement;
					while (objParentElement.tagName != "BODY" && objParentElement.tagName != "BASEFONT" && objParentElement.tagName != "A" && objParentElement.tagName != "P" && objParentElement.tagName != "BR")
 						{ 		    						 					
 						  objParentElement=objParentElement.parentElement;	 				    
 						}							 				   				    		     				   				  			
							
				if (objParentElement.tagName == "A")
					{
						RepareLink(objParentElement);
						var iPos;
						var sLinkName=objParentElement.innerText;
						var fOnlyDisable=(objParentElement.getAttribute("onlydisable")!=null);
						
						if (objRange.text == "")
							{
								objRange.collapse();
								objRange.expand("Character");
								objRange.select();								
							}

						fEditLink=true;
						
						var sCheckHref=objParentElement.outerHTML;						
						var iPos1=sCheckHref.indexOf('href="');
						
						if (iPos1>-1)
							{
								sCheckHref=sCheckHref.slice(iPos1+6);
								iPos1=sCheckHref.indexOf('"');								
								if (iPos1>-1)
									sCheckHref=sCheckHref.slice(0,iPos1);																		
								else
									sCheckHref="";	
							}
							
						if (iPos1>-1)
							sHref=sCheckHref;
						else
							sHref=objParentElement.getAttribute("href");					
														
						var fIOIDFound=false;
						iPos=sHref.indexOf("[");
						if (iPos > -1)
							{
								sHref=sHref.slice(iPos);					
								fIOIDFound=true;
							}
																		
						//iPos=sHref.indexOf("#");
						//if (iPos > -1 && !fIOIDFound)
						if (sHref.slice(sHref.length-1)=="#")//Sprungmarke						
							{
								sHref=sHref.slice(iPos);					
							}
							
						sTarget=objParentElement.getAttribute("target");
						sTitle=objParentElement.getAttribute("title");
						sAttributeGuid=objParentElement.getAttribute("attributeguid");
					}
				
				if (sHref == "#" || sHref == "http://#" || sHref == "http:///#")							
					{
						alert(ConvertToAscii(sLngId678) + " '" + objParentElement.getAttribute("name") + "'");
						SetFocus();
					}
				else				
					{	
						if (objDialogWindow != null)
							{
								objDialogWindow.close(); 
 								while (fClosed != objDialogWindow.closed)
 								  {
 								    fClosed = objDialogWindow.closed;
 								  }					
 							}
 							 						
						objDialogWindow=window.open("","","fullscreen=no, left=" + iLeft +", top=" + iTop + ", width=450, height=280"); 							
						objDialogDoc=objDialogWindow.document;			
						objDialogDoc.open();						
						objDialogDoc.write(ioDialogInsertLink.document.body.outerHTML);
						CreateDialogStyleSheet(objDialogDoc);			
						objDialogDoc.title=sLngId707;						
						objDialogDoc.close();
						objDialogWindow.LoadAttributes(sAttributeList);																		
						objDialogDoc.body.style.display="";											
						objDialogDoc.all("ioHref").value=sHref.replace("&amp;","&");
						objDialogDoc.all("ioTarget").value=sTarget;
						objDialogDoc.all("ioTitle").value=sTitle;
						objDialogDoc.all("ioAttributeGuid").value=sAttributeGuid;
						
						if (fOnlyDisable)
							objDialogDoc.all("ioOnlyDisable").checked=true;
						
						objDialogWindow.objRange=objRange;			
						objDialogWindow.fEditLink=fEditLink;
						if (fEditLink)
							{
								objDialogWindow.objLink=objParentElement;
							}
						objDialogDoc.all.ioHref.focus();	
					}			
				}
		}
	
	function DefineJumpMark()
		{
			objRange = objEditorDoc.selection.createRange();		 
			var RangeHtmlText=objRange.htmlText;
			var sName=objRange.text;

			if (RangeHtmlText.indexOf("<P>")==2)
				{
					RangeHtmlText=RangeHtmlText.slice(5);
					var iPos=RangeHtmlText.lastIndexOf("</P>");			
					
					if (iPos>-1)
						RangeHtmlText=RangeHtmlText.slice(0,iPos);
				}

			AddToUndoBuffer();
			if (objEditorDoc.selection.type != "Control")
				{var objParentElement=objRange.parentElement();
				
					sHref=objParentElement.getAttribute("href");					
					if (sHref == "#" || sHref == "http://#" || sHref == "http:///#")				
						{
							//alert(ConvertToAscii(sLngId679));
						}
					else	
						{var iPos=sName.lastIndexOf(" ");										
							
							if (iPos >  0)
								sName=sName.slice(0,iPos);
							
							//if (sName=="")
								{
									var sNewName=prompt(ConvertToAscii(sLngId2590),sName);
									if (sNewName==null)
										{
											SetFocus();
											return;
										}
									RangeHtmlText='<A href="http://#" name="' + sNewName + '">#' + RangeHtmlText + '</A>';												
								}
							//else
								//RangeHtmlText='<A href="http://#" name="' + sName + '">#' + RangeHtmlText + '</A>';												
								
							objRange.pasteHTML(RangeHtmlText);																	
						}
				}						
			SetFocus();	
		}

	function SetCharSup()
		{objRange = objEditorDoc.selection.createRange();		  		 		 
		 var RangeHtmlText=objRange.htmlText;
			
			AddToUndoBuffer();
			if (RangeHtmlText != "")
				{										
					if (fIE5 || fIE6)
						{
							objRange.execCommand("SuperScript","");													
						}
					else
						{	
							RangeHtmlText=RangeHtmlText.replace("<SUB>","");
							RangeHtmlText=RangeHtmlText.replace("</SUB>","");
							RangeHtmlText=RangeHtmlText.replace("<sub>","");
							RangeHtmlText=RangeHtmlText.replace("</sub>","");
							RangeHtmlText=RangeHtmlText.replace("<SUP>","");
							RangeHtmlText=RangeHtmlText.replace("</SUP>","");
							RangeHtmlText=RangeHtmlText.replace("<sup>","");
							RangeHtmlText=RangeHtmlText.replace("</sup>","");
							RangeHtmlText="<SUP>" + RangeHtmlText + "</SUP>",
							objRange.pasteHTML(RangeHtmlText);					
						}
				}
			SetFocus();	
		}
	
	function SetCharSub()
		{
			objRange = objEditorDoc.selection.createRange();		  		 		 
			var RangeHtmlText=objRange.htmlText;
			
			AddToUndoBuffer();
			if (RangeHtmlText != "")
				{
					if (fIE5 || fIE6)
						{
							objRange.execCommand("SubScript","");													
						}
					else
						{	
							RangeHtmlText=RangeHtmlText.replace("<SUB>","");
							RangeHtmlText=RangeHtmlText.replace("</SUB>","");
							RangeHtmlText=RangeHtmlText.replace("<sub>","");
							RangeHtmlText=RangeHtmlText.replace("</sub>","");
							RangeHtmlText=RangeHtmlText.replace("<SUP>","");
							RangeHtmlText=RangeHtmlText.replace("</SUP>","");
							RangeHtmlText=RangeHtmlText.replace("<sup>","");
							RangeHtmlText=RangeHtmlText.replace("</sup>","");
							RangeHtmlText="<SUB>" + RangeHtmlText + "</SUB>",
							objRange.pasteHTML(RangeHtmlText);					
						}
				}
			SetFocus();	
		}

	function InsertImage()
		{
			var fClosed=false;
			objRange=objEditorDoc.selection.createRange();		  		 		 
			var iLeft=ScreenWidth/2 - 215;
			var iTop=ScreenHeight/2 - 110;
			var ImageTitle="";
		 	 			
		 	SetFocus();
		 	AddToUndoBuffer();			
			if (objEditorDoc.selection.type == "Control")
				{
					objImage=objRange.item(0);						
					if (objImage.tagName=="IMG")
						{
							var HtmlCode=ioDialogFormatImage.document.body.outerHTML;				 					
					
							objDialogWindow=window.open("","","resizable=yes, left=" + iLeft + ", top=" + iTop +", width=430, height=245"); 							
							objDialogDoc=objDialogWindow.document;			
							objDialogDoc.open();					
							objDialogDoc.write(HtmlCode);							
											
							if (ImageTitle == "")
								{
									objDialogDoc.title=sLngId708;
								}
							else
								{
									objDialogDoc.title=ImageTitle;						
								}		
					
							CreateDialogStyleSheet(objDialogDoc);				
							objDialogDoc.close();
							objDialogDoc.all("btinit").click();
							objDialogDoc.body.style.display="";																				
						}
				}
			else
				{
					var objParentElement=objRange.parentElement();								
					var OuterHTML=ioDialogTextImageSelection.document.body.outerHTML;
										
					if (iNoUpload==1)
						{
						OuterHTML=OuterHTML.replace("localimagedisabled","disabled");
						OuterHTML=OuterHTML.replace("serverimagechecked","checked");						
						}
					else	
						{
							OuterHTML=OuterHTML.replace("localimagedisabled","checked");
							OuterHTML=OuterHTML.replace("serverimagechecked","");
						}
					
					if (objDialogWindow != null)
						{
							objDialogWindow.close(); 
 							while (fClosed != objDialogWindow.closed)
 							  {
 							    fClosed = objDialogWindow.closed;
 							  }					
 						}						 		
 					if (objParentElement.tagName == "IMG")
 						{var ImageFileTitle=objParentElement.src;
 						 var iPos=ImageFileTitle.lastIndexOf("/");
 						 
 							ImageTitle=ImageFileTitle.slice(iPos+1);
 							objImage=objParentElement;
 						}
					objDialogWindow=window.open("","","resizable=yes, left=" + iLeft + ", top=" + iTop +", width=300, height=130"); 							
					objDialogDoc=objDialogWindow.document;			
					objDialogDoc.open();					
					
					if (ImageTitle == "")
						{
							objDialogDoc.write(OuterHTML.replace("editimagedisabled","disabled"));							
						}
					else
						{
							objDialogDoc.write(OuterHTML.replace("editimagedisabled",""));
						}		
					
					if (ImageTitle == "")
						{
							objDialogDoc.title=sLngId708;
						}
					else
						{
							objDialogDoc.title=ImageTitle;						
						}		
					CreateDialogStyleSheet(objDialogDoc);				
					objDialogDoc.close();
					objDialogDoc.body.style.display="";										
				}
		}
	
	function SetColor(refId)
		{ var objDialogDoc=null;
		  var fClosed=false;		 
		  var iLeft=ScreenWidth/2 - 255;
		 
		  if (fIE6)
		    var iTop=ScreenHeight/2 - 340;
			else
		    var iTop=ScreenHeight/2 - 310;
		 

			AddToUndoBuffer();
			if (objDialogWindow != null)
				{
					objDialogWindow.close(); 
 					while (fClosed != objDialogWindow.closed)
 					  {
 					    fClosed = objDialogWindow.closed;
 					  }					
 				} 						
			
			if (fIE6)
				objDialogWindow=window.open("","","resizable=yes, left=" + iLeft + ", top=" + iTop + ", width=510, height=600"); 							
			else	
				objDialogWindow=window.open("","","resizable=yes, left=" + iLeft + ", top=" + iTop + ", width=510, height=560"); 							
			
			objDialogDoc=objDialogWindow.document;			
			objDialogDoc.open();						
			objDialogDoc.write(ioColorTable.document.body.outerHTML);
			objDialogDoc.createStyleSheet();			
			with(objDialogDoc.styleSheets[0])
				{
					addRule("BODY","FONT-SIZE: 10px;COLOR: black;FONT-FAMILY: sans-serif;");
					addRule("INPUT","FONT-SIZE: 12px;COLOR: black;FONT-FAMILY: sans-serif;");
					addRule("TD","CURSOR=hand;FONT-SIZE: 10px;COLOR: black;FONT-FAMILY: sans-serif;");		
				}
			objDialogDoc.title=sLngId709;
			objDialogDoc.close();
			objDialogDoc.dir=sDialogTextDirection;
			objDialogDoc.body.style.display="";		
			objDialogDoc.all("refid").value=refId;
		}

	function BtUp(btName)
		{		
			if (document.all(btName) != null)
				{
					document.all(btName).style.borderLeftColor="#ffffff";
					document.all(btName).style.borderTopColor="#ffffff";
					document.all(btName).style.borderRightColor="#808080";
					document.all(btName).style.borderBottomColor="#808080";	
				}
		}
		
	function BtDown(btName)
		{
			if (document.all(btName) != null)
				{
					document.all(btName).style.borderLeftColor="#c0c0c0";
					document.all(btName).style.borderTopColor="#c0c0c0";
					document.all(btName).style.borderRightColor="#c0c0c0";
					document.all(btName).style.borderBottomColor="#c0c0c0";
				}
		}

	function BtInset(btName)
		{		
			if (document.all(btName) != null)
				{
					document.all(btName).style.borderLeftColor="#808080";
					document.all(btName).style.borderTopColor="#808080";
					document.all(btName).style.borderRightColor="#ffffff";
					document.all(btName).style.borderBottomColor="#ffffff";	
				}
		}

	function BtUp2(btName)
		{
			if (document.all(btName) != null)
				{
					document.all(btName).style.backgroundPositionX=1;
					document.all(btName).style.backgroundPositionY=1;
					document.all(btName).style.borderLeft="1";
					document.all(btName).style.borderLeftStyle="outset";			
					document.all(btName).style.borderTop="1";
					document.all(btName).style.borderTopStyle="outset";			
					document.all(btName).style.borderRight="1";
					document.all(btName).style.borderRightStyle="outset";			
					document.all(btName).style.borderBottom="1";
					document.all(btName).style.borderBottomStyle="outset";			
				}
		}
		
	function BtDown2(btName)
		{
			if (document.all(btName) != null)
				{		
					document.all(btName).style.backgroundPositionX=2;
					document.all(btName).style.backgroundPositionY=2;
					document.all(btName).style.borderLeft="1";
					document.all(btName).style.borderLeftStyle="none";			
					document.all(btName).style.borderTop="1";
					document.all(btName).style.borderTopStyle="none";			
					document.all(btName).style.borderRight="1";
					document.all(btName).style.borderRightStyle="none";			
					document.all(btName).style.borderBottom="1";
					document.all(btName).style.borderBottomStyle="none";						
				}
		}
	
	function BtInset2(btName)
		{
			if (document.all(btName) != null)
				{		
					document.all(btName).style.backgroundPositionX=1;
					document.all(btName).style.backgroundPositionY=1;
					document.all(btName).style.borderLeft="1";
					document.all(btName).style.borderLeftStyle="inset";			
					document.all(btName).style.borderTop="1";
					document.all(btName).style.borderTopStyle="inset";			
					document.all(btName).style.borderRight="1";
					document.all(btName).style.borderRightStyle="inset";			
					document.all(btName).style.borderBottom="1";
					document.all(btName).style.borderBottomStyle="inset";			
				}
		}

	function InsertTableRow(iOffset)				 		 			
		{
			var iCellLength=0;
			var iRowIndex=0;

			AddToUndoBuffer();
			objRange=objEditorDoc.selection.createRange();		  		 		 
			if (objEditorDoc.selection.type != "Control")
				{
					if(objRange.parentElement != null)
						{
							var objTable=objRange.parentElement();		 													 				 
						 				 
						 	if (String(objTable.type)!="button")//pruefen, ob nicht Toolbarelement markiert
						 		{			 						 						 						 				 
									while (objTable.tagName != "TABLE" && objTable.tagName != "BODY" && objTable.tagName != "BASEFONT")
 										{ 		    
 										  if (objTable.tagName == "TR")
 												{
 													iRowIndex=objTable.rowIndex; 								
 												}	
 										  objTable=objTable.parentElement;  	 						  
 										}					
									if (objTable.tagName != "BODY" && objTable.tagName != "BASEFONT")
										{	
											iRowIndex=iRowIndex+iOffset;
		 									objTable.insertRow(iRowIndex);
											if (iRowIndex != 0 )
												iCellLength=objTable.rows(iRowIndex-1).cells.length;		 	
											else	
												iCellLength=objTable.rows(iRowIndex+1).cells.length;		 	
											for (var i = 0; i<iCellLength; i++)	
												{
													var objNewCell=objTable.rows(iRowIndex).insertCell();
													objNewCell.innerHTML="&nbsp;";
												}
										}
								}
						}					
					SetFocus();	
				}
		}
	
	function InsertTableColumn(iOffset)				 		 			
		{
			var iCellLength=0;
			var iCellIndex=0;
			var iRows=0;

			AddToUndoBuffer();
			objRange=objEditorDoc.selection.createRange();		  		 		 
			if (objEditorDoc.selection.type != "Control")
				{
					if(objRange.parentElement != null)
						{
							var objTable=objRange.parentElement();		 													 				 

						 	if (String(objTable.type)!="button")//pruefen, ob nicht Toolbarelement markiert
						 		{			 						 						 						 				 
									while (objTable.tagName != "TABLE" && objTable.tagName != "BODY" && objTable.tagName != "BASEFONT")
 										{ 		    
 										  if (objTable.tagName == "TD")
 												{
 													iCellIndex=objTable.cellIndex; 								
 												}	
 										  objTable=objTable.parentElement;  	 						  
 										}					 					
 									if (objTable.tagName != "BODY" && objTable.tagName != "BASEFONT")
 										{	
 											iCellIndex=iCellIndex+iOffset;
 											iRows=objTable.rows.length;	
											for (var i = 0; i<iRows; i++)	
												{
													var objNewCell=objTable.rows(i).insertCell(iCellIndex);
													objNewCell.innerHTML="&nbsp;";
												}
 										}
								}
						}				
					SetFocus();		 	
				}
		}		
	
	function DeleteTableColumn()
		{
			var iCellLength=0;
			var iCellIndex=0;
			var iRows=0;

			AddToUndoBuffer();
			objRange=objEditorDoc.selection.createRange();		  		 		 
			if (objEditorDoc.selection.type != "Control")
				{
					if(objRange.parentElement != null)
						{
							var objTable=objRange.parentElement();		 													 				 
							
						 	if (String(objTable.type)!="button")//pruefen, ob nicht Toolbarelement markiert
						 		{			 						 						 																						 						 
									while (objTable.tagName != "TABLE" && objTable.tagName != "BODY" && objTable.tagName != "BASEFONT")
 										{ 		    
 										  if (objTable.tagName == "TD")
 												{
 													iCellIndex=objTable.cellIndex; 								
 												}	
 										  objTable=objTable.parentElement;  	 						  
 										}					
 									if (objTable.tagName != "BODY" && objTable.tagName != "BASEFONT")
 										{	
 											iRows=objTable.rows.length;	
											for (var i = 0; i<iRows; i++)	
												{
													objTable.rows(i).deleteCell(iCellIndex);
												}
 										}
								}
						}				
					SetFocus();		 	
				}
		}		
		
	function DeleteTableRow()
		{
			var iCellLength=0;
			var iRowIndex=0;
		
			AddToUndoBuffer();
			objRange=objEditorDoc.selection.createRange();		  		 		 
			if (objEditorDoc.selection.type != "Control")
				{
					if(objRange.parentElement != null)
						{
							var objTable=objRange.parentElement();		 													 				 

						 	if (String(objTable.type)!="button")//pruefen, ob nicht Toolbarelement markiert
						 		{			 						 						 
									while (objTable.tagName != "TABLE" && objTable.tagName != "BODY" && objTable.tagName != "BASEFONT")
 										{ 		    
 										  if (objTable.tagName == "TR")
 												{
 													iRowIndex=objTable.rowIndex; 								
 												}	
 										  objTable=objTable.parentElement;  	 						  
 										}	
									if (objTable.tagName != "BODY"  && objTable.tagName != "BASEFONT")
										{	
		 									objTable.deleteRow(iRowIndex);
		 								}	
 								}						
						}					 	
		 			SetFocus();	
		 		}
		}

	function InsertTableCell(iOffset)				 		 			
		{
			var iCellLength=0;
			var iCellIndex=0;
			var iRowIndex=0;

			AddToUndoBuffer();
			objRange=objEditorDoc.selection.createRange();		  		 		 
			if (objEditorDoc.selection.type != "Control")
				{
					if(objRange.parentElement != null)
						{
							var objTable=objRange.parentElement();		 													 				 

						 	if (String(objTable.type)!="button")//pruefen, ob nicht Toolbarelement markiert
						 		{			 						 				 
									while (objTable.tagName != "TABLE" && objTable.tagName != "BODY"  && objTable.tagName != "BASEFONT")
 										{ 		    
 										  if (objTable.tagName == "TR")
 												{
 													iRowIndex=objTable.rowIndex; 								
 												}	
 										  if (objTable.tagName == "TD")
 												{
 													iCellIndex=objTable.cellIndex; 								
 												}	
 										  objTable=objTable.parentElement;  	 						  
 										}					 					
 									if (objTable.tagName != "BODY"  && objTable.tagName != "BASEFONT")
 										{
 											iCellIndex=iCellIndex+iOffset;	
		 									iRows=objTable.rows.length;										
											var objNewCell=objTable.rows(iRowIndex).insertCell(iCellIndex);		 					
											objNewCell.innerHTML="&nbsp;";
		 								}	
								}
						}				
					SetFocus();		 	
				}
		}		

	function DeleteTableCell()				 		 			
		{
			var iCellLength=0;
			var iCellIndex=0;
			var iRowIndex=0;

			AddToUndoBuffer();
			objRange=objEditorDoc.selection.createRange();		  		 		 
			if (objEditorDoc.selection.type != "Control")
				{
					if(objRange.parentElement != null)
						{
							var objTable=objRange.parentElement();		 													 				 
						 	
						 	if (String(objTable.type)!="button")//pruefen, ob nicht Toolbarelement markiert
						 		{			 
									while (objTable.tagName != "TABLE" && objTable.tagName != "BODY"  && objTable.tagName != "BASEFONT")
 										{ 		    
 										  if (objTable.tagName == "TR")
 												{
 													iRowIndex=objTable.rowIndex; 								
 												}	
 										  if (objTable.tagName == "TD")
 												{
 													iCellIndex=objTable.cellIndex; 								
 												}	
 										  objTable=objTable.parentElement;  	 						  
 										}					
 							
 									if (objTable.tagName != "BODY"  && objTable.tagName != "BASEFONT")
 										{
 											iRows=objTable.rows.length;	
 											objTable.rows(iRowIndex).deleteCell(iCellIndex);
										}
								}
						}					 	
					SetFocus();
				}
		}		

	function SetHeadingStyle(hStyle)
		{		 
		 AddToUndoBuffer();
		 objRange=objEditorDoc.selection.createRange();		 
		 var RangeText=objRange.text;
		 var objElt=null;	
		 var objEltStart=null;	
		 var Buffer1="";
		 var Buffer2="";
		 var InnerHtml="";
		 var iY=objRange.boundingTop;
			
			if(objRange.parentElement != null)
				{					
					objElt=objRange.parentElement();
					objEltStart=objElt;		 									
					
					while (objElt.tagName != "H1" && objElt.tagName != "H2" && objElt.tagName != "H3"  && objElt.tagName != "H4" && objElt.tagName != "H5" && objElt.tagName != "H6" && objElt.tagName != "BODY"  && objElt.tagName != "BASEFONT")
 						{ 		    
 						  objElt=objElt.parentElement;	 				    
 						}					 								 				   				    		     				   				  

					if ((objElt.tagName=="H1" && hStyle=="H1") || (objElt.tagName=="H2" && hStyle=="H2") || (objElt.tagName=="H3" && hStyle=="H3") || (objElt.tagName=="H4" && hStyle=="H4") || (objElt.tagName=="H5" && hStyle=="H5") || (objElt.tagName=="H6" && hStyle=="H6"))
						objElt.outerHTML=objElt.innerHTML;
					else 
						{
 							if (RangeText != objElt.innerText && RangeText!="")
 								{  							
 									if (objEltStart.tagName == "A")
 										objRange.pasteHTML("<" + hStyle + ">" + objEltStart.outerHTML + "</" + hStyle + ">"); 							 							 								
 									else
 										objRange.pasteHTML("<" + hStyle + ">" + RangeText + "</" + hStyle + ">"); 							 							 								
 								}
 							else
 								{
									if (RangeText!="" && objElt.tagName != "H1" && objElt.tagName != "H2" && objElt.tagName != "H3"  && objElt.tagName != "H4" && objElt.tagName != "H5" && objElt.tagName != "H6")
 										{
 											objElt.innerHTML="<" + hStyle + ">" + RangeText + "</" + hStyle + ">"; 							 								 									 									
 										}
 									else
 										{	
 											Buffer1=objElt.outerHTML; 									
 											Buffer2=Buffer1.replace("<" + objElt.tagName, "<" + hStyle);
 											Buffer2=Buffer2.replace("</" + objElt.tagName + ">", "</" + hStyle + ">");
 											objElt.outerHTML=Buffer2; 									
 										}
 								}	
 						}
 				}  			
 			SetFocus();			
 			objRange.moveToPoint(0,iY); 			
 			objRange.select();
		}
		
	function DesignModeOff()
		{
			document.Editor.btDesignModeOff.click();
			objEditorDoc=ioEditor.document;
		}	

	function DesignModeOn()
		{
			document.Editor.btDesignModeOn.click();			
			objEditorDoc=ioEditor.document;
		}	

	function AddToUndoBuffer()
		{
			if (!fEnableHtmlView)
				return;
			
			var sBufferCode=objEditorDoc.body.innerHTML;
			
			if (iUndoCounter==-1)
				{			
					iUndoCounter++;			
					UndoSourceCodeArray[iUndoCounter]=sBufferCode;							
				}
			else if (sBufferCode!=UndoSourceCodeArray[iUndoCounter-1])
				{
					if (iUndoCounter<iMaxUndoCount)
						{
							iUndoCounter++;			
							UndoSourceCodeArray[iUndoCounter]=sBufferCode;							
						}
					else
						{
							for (var i=0;i<iMaxUndoCount;i++)
								{
									UndoSourceCodeArray[i]=UndoSourceCodeArray[i+1];
								}
							UndoSourceCodeArray[iMaxUndoCount]=sBufferCode;	
						}
				}							
		}	
		
	function Undo()
		{
			document.all("btUndo").disabled=true;	
			if (UndoSourceCodeArray[iUndoCounter+1]==undefined)
				UndoSourceCodeArray[iUndoCounter+1]=objEditorDoc.body.innerHTML;

			if (iUndoCounter>0)
				{										
					if (UndoSourceCodeArray[iUndoCounter-1]!=undefined)
						{
							iUndoCounter--;
							//objEditorDoc.body.innerHTML=UndoSourceCodeArray[iUndoCounter];
							RepareURLs(UndoSourceCodeArray[iUndoCounter]);
						}
				}
			else
				{	
					//objEditorDoc.body.innerHTML=UndoSourceCodeArray[0];	
					RepareURLs(UndoSourceCodeArray[0]);
				}
				
			document.all("btUndo").disabled=false;	
			SetFocus();	
		}
		
	function Redo()
		{
			document.all("btRedo").disabled=true;	
			
			if (UndoSourceCodeArray.length>iUndoCounter)
				{					
					if (UndoSourceCodeArray[iUndoCounter+1]!=undefined && iUndoCounter<iMaxUndoCount)
						{
							iUndoCounter++;
							//objEditorDoc.body.innerHTML=UndoSourceCodeArray[iUndoCounter];
							RepareURLs(UndoSourceCodeArray[iUndoCounter]);
						}
				}
			
			document.all("btRedo").disabled=false;	
			SetFocus();
		}		

	function TabPlusAscii()
		{					
			AddToUndoBuffer();
			objRange=objEditorDoc.selection.createRange();		 
 			objRange.text="    " + objRange.text;
 			SetFocus();												
		}
	
	function TabMinusAscii()
		{					
			AddToUndoBuffer();
			objRange=objEditorDoc.selection.createRange();		 
			if (objRange.boundingLeft>12) 				
 				{
 					var Buffer=objRange.text;
 					objRange.moveStart("character",-4); 					
 					var Left4Buffer=objRange.text;
 					if (Left4Buffer.slice(0,4)=="    ")
 						objRange.text=Buffer;
 				}
 			SetFocus();												
		}
	
	function SpellChecking()
		{
			sUncleanedHTMLData=objEditorDoc.body.innerHTML;
			if (iUseExtendedSpellChecker==1)
				{
					doSpell(sCurrentLngId, objEditorDoc.body, "../../cgi-bin/sproxy.asp", true);
					//doSpell('en', objEditorDoc.body, '../../cgi-bin/sproxy.asp', true);					
					return;
				}
			
			var objRange=objEditorDoc.selection.createRange();		 
			var sValue=objRange.text;

			if (sValue.length==0)
				sValue=objEditorDoc.body.innerText;
				
			if (sValue=="")
				return;
			else
				sValue=escape(sValue);	

			SetFocus();
			
			var fClosed=false;		 
			var iWidth=300;
			var iHeight=50;
			var iLeft=window.screen.width/2 - iWidth/2;
			var iTop=window.screen.height/2 - iHeight/2 - 25;	
								 				
			var objDialogWindow=window.open("","_blank",'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,width=' + iWidth + ',height=' + iHeight + ',screenX=' + iLeft + ',screenY=' + iTop + ',left=' + iLeft + ',top=' + iTop);			
			objDialogWindow.document.open();
			objDialogWindow.document.write("<HTML><BODY bgcolor=#e0e0e0 onblur='top.close()'><CENTER><BR><FONT color=#000000 face='Arial' size=3>" + sLngId3183 + "</FONT></CENTER></BODY></HTML>");			
			objDialogWindow.document.title="RedDot";
			objDialogWindow.document.close();			
			objDialogWindow.focus();
			
			ioServerData.document.open();
			ioServerData.document.write('<HTML><BODY onload="document.ioForm.submit()"><FORM name="ioForm" action="ioSpellChecking.asp" method=post><INPUT name="CheckText" type="hidden" value="' + sValue + '"></FORM></BODY></HTML>');
			ioServerData.document.close();			
		}
		
	function ConvertToAscii(sValue)
		{			
			sValue=sValue.replace(/&uuml;/g,String.fromCharCode(252));
			sValue=sValue.replace(/&ouml;/g,String.fromCharCode(246));
			sValue=sValue.replace(/&auml;/g,String.fromCharCode(228));
			sValue=sValue.replace(/&Uuml;/g,String.fromCharCode(220));
			sValue=sValue.replace(/&Ouml;/g,String.fromCharCode(214));
			sValue=sValue.replace(/&Auml;/g,String.fromCharCode(196));
			sValue=sValue.replace(/&szlig;/g,String.fromCharCode(223));
			sValue=sValue.replace(/&lt;/g,"<");
			sValue=sValue.replace(/&gt;/g,">");
			return sValue;
		}		
		
	function Search()
		{
			var sSearchText=document.Editor.txtSearch.value;
			var sBookMark=null;						
			var sLastBookMark=null;									
			var fExit=false;			
			var oRange=objEditorDoc.body.createTextRange();			
			var iLength=oRange.text.length;
			var iSelection=0;
										
			if (sSearchText.length==0)
				{
					alert(ConvertToAscii(sLngId3541));	
					document.Editor.txtSearch.focus();
				}
			else	
				{
					while (!fExit)
						{ 									
							if(oRange.findText(sSearchText))
								{									
									sBookMark = oRange.getBookmark();  											
									if (sBookMark==sLastBookMark)
											fExit=true;					
									else
										{
											oRange.moveToBookmark(sBookMark);																																	
																		
											oRange.select();
											iSelection=AskForContinue();
											if(iSelection==7)//Cancel
												fExit=true;
											else				
												{										
													oRange.moveStart("Character",1);								
													oRange.moveEnd("Character",iLength);									
												}
										}
									sLastBookMark=sBookMark;	
								}
							else
								fExit=true;											
						}			
					if (iSelection!=7)	
						alert(ConvertToAscii(sLngId3540));	
				}
		}

	function SearchReplace()
		{
			var sSearchText=document.Editor.txtSearch.value;
			var sReplaceText=document.Editor.txtReplace.value;
			var oRange=null;
			var sBookMark=null;						
			var sLastBookMark=null;									
			var fExit=false;
			var iSelection=0;
			oRange = objEditorDoc.body.createTextRange();			
			var iLength=oRange.text.length;
																	
			if (sSearchText.length==0)
				{
					alert(ConvertToAscii(sLngId3541));	
					document.Editor.txtSearch.focus();
				}
			else	
				{
					while (!fExit && sSearchText.length>0)
						{ 									
							if(oRange.findText(sSearchText))
								{									
									sBookMark = oRange.getBookmark();  											
									if (sBookMark==sLastBookMark)
											fExit=true;					
									else
										{
											oRange.moveToBookmark(sBookMark);																																	
																		
											oRange.select();
											iSelection=AskForReplace();
											if (iSelection==2)//Cancel
												fExit=true;
											else if (iSelection==6)//Ersetzen
												oRange.text=sReplaceText;				
																															
											oRange.moveStart("Character",1);								
											oRange.moveEnd("Character",iLength);
										}
									sLastBookMark=sBookMark;	
								}
							else
								fExit=true;											
						}			
					if (iSelection!=2)
						alert(ConvertToAscii(sLngId3540));		
				}
		}
		
	function SetSearchText()
		{			
			var objRange=objEditorDoc.selection.createRange();		 
			var sText=objRange.text;
			
			if (sText.length>0)
				document.Editor.txtSearch.value=sText;
				
		}

	function CreateDialogStyleSheet(objDialogDoc)
		{
			objDialogDoc.createStyleSheet();
			
			with (objDialogDoc.styleSheets[0])
				{
					addRule("BODY","FONT-SIZE: 12px;COLOR: black;FONT-FAMILY: sans-serif;");
					addRule("SELECT","FONT-SIZE: 13px;COLOR: black;FONT-FAMILY: sans-serif;");
					addRule("INPUT","FONT-SIZE: 13px;COLOR: black;FONT-FAMILY: sans-serif;");
					addRule("TD","FONT-SIZE: 12px;COLOR: black;FONT-FAMILY: sans-serif;");		
				}
			
			objDialogDoc.dir=sDialogTextDirection;				
			
		}
		
	function StartCheckHtmlCode()
		{	
			var objLI=objEditorDoc.all.tags("LI");
			for (var i=0;i<objLI.length;i++)//Listen immer reparieren
				{
					var sOuterHTML=objLI(i).outerHTML;
					var iPos=sOuterHTML.indexOf(">");
					var sTagContent=sOuterHTML.slice(0,iPos+1);
					objLI(i).outerHTML=sTagContent + objLI(i).innerHTML + "</LI>";
				}										

			for (var i = 0; i<objEditorDoc.links.length; i++)
				{	
					RepareLink(objEditorDoc.links.item(i));					
				}														

			if (iDeactivateTextFilter==1)
				return;
			
			ShowInfoLabel();
			fKeyboardLocked=true;
			setTimeout("CheckHtmlCode()",100);
		}
		
	function CheckHtmlCode()
		{
			if (HtmlMode == "1")
				{			
					sUncleanedHTMLData=objEditorDoc.body.innerHTML;
					if (CleanHTMLCode(objEditorDoc.body))
						{																
							for (var i = 0; i<objEditorDoc.links.length; i++)
								{	
									RepareLink(objEditorDoc.links.item(i));					
								}														
							LoadStyleSheets();								
							alert(ConvertToAscii(sLngId4935));								
						}
				}

			top.document.body.style.display="";
			fKeyboardLocked=false;
			SetFocus();
		}	

	function StartSetFontPresetRedLining()
		{
			if (String(top.frames.ioDialogRedLining)=="undefined")
				return;
			else
				InterV3=window.setInterval("SetFontPresetRedLining()",200);
		}

	function SetFontPresetRedLining()
		{			
			var objDoc=top.frames.ioDialogRedLining.document;
			if (objDoc.readyState!="complete")
				return;
			
			window.clearInterval(InterV3);				

			with (objDoc.body.style)
				{
					if (SelFontFamily == "")
						SelFontFamily="Arial";
								
					fontFamily=SelFontFamily;
															
					var iFontSizeIndex=Number(SelFontSize)-1;
					fontSize=FontSizeVarArray[iFontSizeIndex];
							
					fontStyle="normal";									
							
					var CheckSelFontColor=SelFontColor;	
					color=SelFontColor;
					
					if(CheckSelFontColor.toUpperCase() == "WHITE" || CheckSelFontColor.toUpperCase() == "#FFFFFF")
						backgroundColor="#C0C0C0";
						
					if (HtmlMode != "0")
						{
							var sFontCheckData=OriginalData.toUpperCase();
							if (sFontCheckData.indexOf(' COLOR=#FFFFFF')!=-1 || sFontCheckData.indexOf(' COLOR="#FFFFFF"')!=-1 || sFontCheckData.indexOf(' COLOR="WHITE"')!=-1)
								backgroundColor="#C0C0C0";
						}
				}
			
		}

	function CleanHTMLCode()
		{	
			var sBuffer=objEditorDoc.body.innerHTML;
			if (sBuffer.slice(0,3).toUpperCase()!="<DT" && sBuffer.indexOf("<")>-1)
				sBuffer="<DT></DT>" + sBuffer;

			
			fHTMLCodeCleaned=false;
			
			if (/(<[^>]*)class=Mso[^>]+(>)/gi.test(sBuffer))
				{
					fHTMLCodeCleaned=true;
					sBuffer=sBuffer.replace(/(<[^>]*)class=Mso[^>]+(>)/gi, "$1$2");//Quatsch aus Word2000 entfernen
				}
			
			var objTempBuffer = new DocumentAnalyser(sBuffer);
			
			if (/(<\?[^>]+>)/gi.test(objTempBuffer.HTMLCode))
				{
					fHTMLCodeCleaned=true;
					objTempBuffer.HTMLCode = objTempBuffer.HTMLCode.replace( /(<\?[^>]+>)/gi, "");
				}	
			
			if (/(<\\?o\:[^>]+>)/gi.test(objTempBuffer.HTMLCode))
				{
					fHTMLCodeCleaned=true;
					objTempBuffer.HTMLCode = objTempBuffer.HTMLCode.replace( /(<\\?o\:[^>]+>)/gi, "");
				}	

			if (/(<\\?v\:[^>]+>)/gi.test(objTempBuffer.HTMLCode))
				{
					fHTMLCodeCleaned=true;
					objTempBuffer.HTMLCode = objTempBuffer.HTMLCode.replace( /(<\\?v\:[^>]+>)/gi, "");
				}

			objTempBuffer.RemoveEmptyAttributes();
								
			//objTempBuffer.RemoveTagAttribute("", "style");
			objTempBuffer.RemoveTagAttribute("", "lang");

			if (fHTMLCodeCleaned)
				{
					objEditorDoc.body.innerHTML = objTempBuffer.HTMLCode;

					var objSpan = objEditorDoc.body.all.tags("SPAN");
											
					for(var i=objSpan.length-1; i>=0; i--)
						{											
							if(/^<span>.*$/gi.test(objSpan[i].outerHTML))
								objSpan[i].outerHTML = objSpan[i].innerHTML;
						}
				}
			
			RemoveForbiddenTags();
			HideInfoLabel();
			
			return fHTMLCodeCleaned;
		}
			
	function RemoveForbiddenTags()
		{
			RemoveTags("TITLE");
			RemoveTags("META");
			RemoveTags("STYLE");
						
			if (!document.all("btTabPlus"))
				RemoveTags("BLOCKQUOTE");

			if (!document.all("btBold"))
				{
					RemoveTags("STRONG");
					RemoveTags("B");
				}

			if (!document.all("btItalic"))
				{
					RemoveTags("I");
					RemoveTags("EM");
				}

			if (!document.all("btUnderline"))
				RemoveTags("U");

			if (!document.all("btSup"))
				RemoveTags("SUP");

			if (!document.all("btSub"))
				RemoveTags("SUB");

			if (!document.all("cmbFontSize") && !document.all("cmbFontName") && !document.all("btForeColor"))
				{
					RemoveTags("FONT");
					RemoveStyleAttribute("fontSize");								
					RemoveStyleAttribute("mso-bidi-font-size");	
					RemoveStyleAttribute("fontFamily");								
					RemoveStyleAttribute("mso-bidi-font-family");	
					RemoveStyleAttribute("color");								
				}
			else
				{
					if (!document.all("cmbFontSize"))
						{
							RemoveAttribute("FONT","size");
							RemoveStyleAttribute("fontSize");								
							RemoveStyleAttribute("mso-bidi-font-size");	
						}

					if (!document.all("cmbFontName"))
						{
							RemoveAttribute("FONT","face");
							RemoveStyleAttribute("fontFamily");								
							RemoveStyleAttribute("mso-bidi-font-family");	
						}
		
					if (!document.all("btForeColor"))
						{
							RemoveAttribute("FONT","color");
							RemoveStyleAttribute("color");								
						}

				}
			
			if (iHideEditTarget==1)//Attribut Target entfernen
				RemoveAttribute("A","target");
				
			if (!document.all("btLeft"))
				{
					RemoveAttribute("FONT","align","left");			
					RemoveAttribute("P","align","left");			
				}

			if (!document.all("btCenter"))
				{
					RemoveAttribute("FONT","align","center");			
					RemoveAttribute("P","align","center");
					RemoveTags("CENTER");
				}

			if (!document.all("btJustify"))
				{
					RemoveAttribute("FONT","align","justify");			
					RemoveAttribute("P","align","justify");
				}

			if (!document.all("btRight"))
				{
					RemoveAttribute("FONT","align","right");			
					RemoveAttribute("P","align","right");
				}

			if (!document.all("btList"))
				{
					RemoveTags("OL");
					RemoveTags("UL");
					RemoveTags("LI");
				}

			/*
			if (!document.all("btNum"))
				{
					RemoveTags("OL");
					RemoveTags("LI");
				}
			*/
			
			if (!document.all("btBackColor"))
				RemoveStyleAttribute("BackgroundColor");	

			if (!document.all("btInsertTable"))
				RemoveTags("TABLE");		

			if (!document.all("btInsertHR1"))
				RemoveTags("H1");		

			if (!document.all("btInsertHR2"))
				RemoveTags("H2");		

			if (!document.all("btInsertHR3"))
				RemoveTags("H3");		

			if (!document.all("btInsertHR4"))
				RemoveTags("H4");		

			if (!document.all("btInsertHR5"))
				RemoveTags("H5");		
				
			if (!document.all("btInsertHR"))
				RemoveTags("HR");		

			if (!document.all("btInsertLink"))
				RemoveTags("A");		

			if (!document.all("btInsertImage"))
				RemoveTags("IMG");		
		}
		
	function RemoveTags(sTagName)
		{
			var objTag = objEditorDoc.body.all.tags(sTagName);

			for(var i=objTag.length-1; i>=0; i--)
				{
					fHTMLCodeCleaned=true;	
					if (sTagName=="TABLE")
						objTag[i].outerText=objTag[i].innerText;
					else
						{
							try
								{
									objTag[i].outerHTML=objTag[i].innerHTML;
								}
							catch (e) {}	
						}
				}
		}
	
	function RemoveStyleAttribute(sAttribute)
		{
			for(i=0; i<objEditorDoc.body.all.length; i++) 
				{
					var objStyle=objEditorDoc.body.all(i).getAttribute("style");
					if (objStyle)
						{
							if (objStyle.getAttribute(sAttribute))
								{
									objStyle.setAttribute(sAttribute,"",false);
									fHTMLCodeCleaned=true;										
								}
						}
				}
		}
	
	function RemoveAttribute(sTagName, sAttribute, sAttributeValueToDelete)
		{
			var objTag = objEditorDoc.body.all.tags(sTagName);
									
			for(var i=objTag.length-1; i>=0; i--)
				{
					var sAttributeValue=objTag[i].getAttribute(sAttribute);
					
					if (sAttributeValue)
						{
							if (sAttributeValueToDelete)//Attribut abhaengig vom Wert loeschen
								{
									if (sAttributeValueToDelete==sAttributeValue)
										{
											fHTMLCodeCleaned=true;	
											try
												{
													objTag[i].removeAttribute(sAttribute);
												}
											catch (e) {}	
										}
								}
							else//Attribut immer loeschen
								{
									fHTMLCodeCleaned=true;	
									try
										{
											objTag[i].removeAttribute(sAttribute);
										}
									catch (e) {}										
								}
						
							if (objTag[i].outerHTML.indexOf("<FONT>")==0)																						
								{
									try
										{
											objTag[i].outerHTML=objTag[i].innerHTML;
										}
									catch (e) {}	
								}											
						}
				}
		}

	function DocumentAnalyser(sHTMLCode)
		{
			this.HTMLCode = sHTMLCode;
		}

	DocumentAnalyser.prototype.RemoveTagAttribute=function(sTagName, sAttribute)
		{
			if(this.HTMLCode)
				{
					if(/^\w+$/.test(sAttribute) && ((arguments.length > 2) ? arguments[2] : /^\w*$/.test(sTagName)))
						{
							var RegEx = new RegExp("(\\<" + sTagName + "[^\\>]" + (sTagName ? "*" : "+") + ")(\\s" + sAttribute + " ?\\= ?((\\\"[^\\\"\\>]*\\\")|(\\'[^\\'\\>]*\\')|([^\\s\\>]*)))", "gi");
							if (RegEx.test(this.HTMLCode))
								{
									fHTMLCodeCleaned=true;
									this.HTMLCode = this.HTMLCode.replace(RegEx, "$1");
								}
						}
				}
		}

	DocumentAnalyser.prototype.RemoveEmptyAttributes=function()
		{
			if(this.HTMLCode)
				{
					var sAttribute = (arguments.length && /^\w*$/.test(arguments[0])) ? arguments[0] : "";
					var RegEx = new RegExp("(\\<[^\\>]+) " + (sAttribute ? sAttribute : "\\w+") + "\\=[\\\"\\']{2}", "gi");
					
					if (RegEx.test(this.HTMLCode))
						{
							fHTMLCodeCleaned=true;
							this.HTMLCode = this.HTMLCode.replace(RegEx, "$1");
						}
				}
		}


			
