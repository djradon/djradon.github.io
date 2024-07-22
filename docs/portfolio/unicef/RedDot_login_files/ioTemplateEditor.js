
	//JAVA-Script Code for ioTemplateEditor.asp
	//Author: Joerg Trautmann

	var cScriptVersionTemplateEditor="5.77";

	var cRed="#ff0000";
	var cBlack="#000000";
	var cBlue="#0000ff";
	var cGreen="#00ff00";
	var cGray="#a0a0a0";
	var cWhite="#ffffff";
	var cYellow="#ffff00";

	var cRedDotType="RedDot";
	var cBlockType="Block";
	var cIoVarType="IoVar";

	var sContentTextDirection="LTR";

	var ELtType="";
	var EltDefaultValue="";
	var EltCategoryType="";
	var EltRefElementGuid="";
	var EltDepth="";
	var EltDropOuts="";
	var EltTableOpen="";
	var EltTableClose="";
	var EltRowOpen="";
	var EltRowClose="";
	var EltColOpen="";
	var EltColClose="";	
	var EltEvalCalledPage="";
	var EltUseMainLink="";

	var EltName="";
	var EltGuid="";
	var EltRDDescription="";
	var EltRDExample="";
	var EltSearchDepth="";
	var EltMediaTypeName="";
	var EltMediaTypeAttribute="";		
	var EltRDExampleGuid="";
	var EltAttributeGuid="";
	var EltAttributeType="";
	var EltCategoryGuid="";
	var	EltOnlyHrefValue="";
	var EltRequired="";
	var EltDeactivateTextFilter="";
	var EltKeywordSeparator="";
	var EltUseSSL="";
	var EltPicsAllLanguages="";
	var EltInvisibleInClient="";
	var EltInvisibleInPage="";
	var EltEditorialElement="";
	var EltBeginMark="";
	var EltEndMark="";
	var EltUserDefinedAllowed="";
	var EltDoNotHtmlEncode="";
	var EltMaxSize="";	
	var EltProjectGuid="";
	var EltTemplateGuid ="";
	var EltElementGuid ="";	
	var EltMaxPicWidth="";
	var EltMaxPicHeight="";
	var EltFontClass="";
	var EltFontSize="";
	var EltFontColor="";
	var EltFontFace="";
	var EltWidth="";
	var EltHeight="";
	var EltBorder="";
	var EltVSpace="";
	var EltHSpace="";
	var EltAlign="";
	var EltUserMap="";
	var EltSupplement="";
	var EltImageSupplement="";
	var EltPresetAlt="";
	var EltAlt="";
	var EltSrc="";
	var EltXslFile="";
	var EltShape="";
	var EltCoords="";
	var EltTarget="";
	var EltProjectVariantGuid="";
	var EltLanguageVariantGuid="";
	var EltLanguageVariantId="";
	var EltFolderGuid="";
	var EltConnectionGuid="";
	var EltRelatedFolderGuid="";
	var EltSubType="";
	var EltFontBold="";
	var EltHitType="";
	var EltIsTargetContainer="";
	var EltIsDynamic="";
	var EltHref="";
	var EltValue="";
	var EltDefaultSuffix="";
	var EltWholeText="";
	var EltFrameName="";
	var EltMarginWidth="";
	var EltMarginHeight="";
	var EltScrolling="";
	var EltNoResize="";
	var EltFrameBorder="";
	var EltCrlfToBr="";
	var EltEditorOptions="";
	var EltEditAlignLeft="";
	var EltEditAlignCenter="";
	var EltEditAlignRight="";
	var EltEditFontBackColor="";
	var EltEditFontBold="";
	var EltEditFontType="";
	var EltEditFontForeColor="";
	var EltEditFontItalic="";
	var EltEditFontSize="";
	var EltEditFontUnderline="";
	var EltEditInsertPicture="";
	var EltEditDefineMarker="";
	var EltEditInsertMarker="";
	var EltEditInsertLink="";
	var EltEditInsertTab="";
	var EltEditInsertTable="";
	var EltEditInsertList="";
	var EltEditInsertNumb="";
	var EltEditClearTab="";
	var EltEditSubscript="";
	var EltEditSuperscript="";
	var EltConvertMode="";
	var EltCompression="";
	var EltOnlyNonWebSources="";
	var EltTargetFormat="";
	var EltConvert="";
	var EltOrientation="";
	var EltSuffixes="";
	var EltIsRefField="";
	var EltListType="";
	var EltOrderBy="";
	var EltIsListEntry="";
	var EltLinksInText="";
	var EltIsSupplement="";
	var EltDatabaseName="";
	var EltTableName="";
	var EltColumnName="";
	var EltColumnType="";
	var EltColumnIOType="";
	var EltBinColumnName="";
	var EltDefaultInfo="";
	var EltFormatButton="";
	var EltFormatNo="";
	var EltFormat="";
	var EltLcId="";
	var EltFormatting="";
	var EltDirection="";
	var EltNextPageType="";
	var EltDefaultTextGuid="";
	var EltDefaultText="";
	var EltOptionListData="";
	var EltOptionListData="";
	var EltFieldType="";
	var EltParentElementGUID="";
	var EltParentElementName="";
	var EltExtendedList="";
	var EltIgnoreWorkflow="";
	var EltDoNotRemove="";
	var EltLanguageIndependent="";

	var objEditorDoc=ioEditor.document;
	var objRange=null;
	var objDialogWindow=null;
	var objImage=null;

	var ScreenWidth=window.screen.width;
	var ScreenHeight=window.screen.height;

	var OriginalData="";
	var OriginalHtmlData="";
	var TempBuffer="";
	var InterV1=0;
	var InterV2=0;
	var sAppVersion=String(top.clientInformation.appVersion);
	var sBookMark=null;
	var sOldEltName="";

	var fIE5=(sAppVersion.indexOf("MSIE 5")>-1);
	var fIE5_5=(sAppVersion.indexOf("MSIE 5.5")>-1);
	var fIE6=(sAppVersion.indexOf("MSIE 6")>-1);
	var fCreateNewElement=false;
	var fTemplateChanged=false;

	var iUndoCounter=-1;
	var iFontSizeIndex=1;
	//var FontSizeVarArray = new Array("xx-small","x-small","small","medium","large","x-large","xx-large");
	var FontSizeVarArray = new Array("10px","13px","16px","18px","24px","32px","48px");
	var VStepVarArray = new Array("12","16","18","20","27","36","50");
	var RedDotVarArray = new Array();
	var BlockVarArray = new Array();
	var IoVarArray = new Array();
	var PredefinedEltTypesArray = new Array();
	var RedDotComboArray = new Array("<!IoRedDotAddPage>","<!IoRedDotAppendPage>","<!IoRedDotOpenPage>");
	//var RedDotComboArray = new Array("<!IoRedDotOpenPage>");
	var BlockTypesComboArray = new Array("<!IoRangeList>","<!/IoRangeList>","<!IoRangeHit>","<!/IoRangeHit>","<!IoRangeDynLink>","<!/IoRangeDynLink>","<!IoRangeData>","<!/IoRangeData>","<!IoRangeBack>","<!/IoRangeBack>","<!IoRangeConditional>","<!/IoRangeConditional>","<!IoRangeRedDotEditOnly>","<!/IoRangeRedDotEditOnly>","<!IoRangeRedDotMode>","<!/IoRangeRedDotMode>","<!IoRangeNoRedDotMode>","<!/IoRangeNoRedDotMode>","<!IoRangeNoEditMode>","<!/IoRangeNoEditMode>","<!IoRangePreExecute>","<!/IoRangePreExecute>","<!IoRangeBreadCrumb>","<!/IoRangeBreadCrumb>");
	var UndoTemplateSourceCodeArray = new Array();
	var UndoTemplateElementCodeArray = new Array();

	function KillError(Error,Url,Line)
		{
	    return true;
		}

	window.onerror=KillError;

	InterV1=window.setInterval("CheckReadyState()",250);

	function CheckReadyState()
		{
			var sReadyState="";

			for (var i=0; i<top.frames.length; i++)
				{
					try
						{
							sReadyState=top.frames(i).document.readyState;
						}
					catch (e) {}	

					if (sReadyState!="complete")
						return;				
				}
			
			window.clearInterval(InterV1);
			Init();

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

	function CheckBaseFont()
		{
			if (objEditorDoc.body.innerText=="")
				NewText();
			else
				{
					with (objEditorDoc.body.style)
						{
							fontFamily="Courier New, Courier";
							fontSize=FontSizeVarArray[iFontSizeIndex];
							fontStyle="normal";
						}
					objEditorDoc.body.noWrap="noWrap";
				}

			//document.body.onmousedown=KillMouseEvent;
			//objEditorDoc.body.onmousedown=CheckMouseEvent;
			objEditorDoc.body.oncontextmenu=DisablePopupMenu;
			objEditorDoc.body.onkeydown=CheckKeyEvent;
			objEditorDoc.body.ondrop=KillDropEvent;

		}

	function DisablePopupMenu()
		{
			return false;
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
			var sBuffer="";
			var iPos1=0;
			var iPos2=0;

			fTemplateChanged=true;

			if (objEditorDoc.queryCommandValue("OverWrite"))
				objEditorDoc.execCommand("OverWrite","",false);

			var objEvent=ioEditor.window.event;

			var objRange=objEditorDoc.selection.createRange();
			var objCheckLeft=objRange.parentElement();
			objRange.moveStart("character",1);
			//document.title=Math.round(objRange.offsetTop/VStepVarArray[iFontSizeIndex]) + Math.round(top.frames.ioEditor.document.body.scrollTop/VStepVarArray[iFontSizeIndex]);
			var objCheckRight=objRange.parentElement();

			if ((objCheckLeft.tagName=="FONT" || objCheckRight.tagName=="FONT") && objCheckLeft.style.backgroundColor!=cGray)
				{
					if (objEvent.keyCode>40 || objEvent.keyCode<35)
						return false;
				}

 			if (objEvent.keyCode==8)//Backspace
 				{
					sBuffer=objRange.text;
					objRange.moveStart("character",-3);
					objRange.moveEnd("character",-3);
					objCheckLeft=objRange.parentElement();
					if (objCheckLeft.tagName=="FONT" && objCheckLeft.style.backgroundColor!=cGray)
						return false;

					if (sBuffer.length>0)
						{
							iPos1=sBuffer.indexOf("<%");
							iPos2=sBuffer.indexOf("%>");
							if ((iPos1>iPos2) || (iPos1==-1 && iPos2>-1))
								return false;
						}
 				}

 //LW 9.10.2001 Verhindern, dass Klammern durch "DELETE" geloescht werden.
 			if (objEvent.keyCode==46)//Delete
 				{
					sBuffer=objRange.text;
					objRange.moveStart("character",-1);

					switch (objRange.text)
						{
							case ">":
								objRange.moveEnd("character",-2);
								break;
							case "<":
								objRange.moveStart("character",1);
								objRange.moveEnd("character",1);
						}
					objCheckRight=objRange.parentElement();
					if (objCheckRight.tagName=="FONT" && objCheckLeft.style.backgroundColor!=cGray)
						return false;

					if (sBuffer.length>0)
						{
							iPos1=sBuffer.indexOf("<%");
							iPos2=sBuffer.indexOf("%>");
							if ((iPos1>iPos2) || (iPos1==-1 && iPos2>-1))
								return false;
						}
 				}

 			if (objEvent.keyCode==13 || objEvent.keyCode==32)
 					AddToUndoBuffer();

			if (objEvent.keyCode==9 && objEvent.shiftKey)
				{
					TabMinus();
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
					if (document.Editor.btItalic == null)
						return false;
				}
			else if (objEvent.keyCode==66 && objEvent.ctrlKey)//Strg+B abfangen
				{
					if (document.Editor.btBold == null)
						return false;
				}
			else if (objEvent.keyCode==9)
				{
					TabPlus();
					return false;
				}
			else if (objEvent.keyCode==90 && (!objEvent.altKey && objEvent.ctrlKey))//Undo abfangen
				{
					Undo();
					return false;
				}
			else if (objEvent.keyCode==89 && (!objEvent.altKey && objEvent.ctrlKey))//Redo abfangen
				{
					Redo();
					return false;
				}
			else if (objEvent.keyCode==86 && objEvent.ctrlKey || objEvent.keyCode==45 && objEvent.shiftKey)//Paste	abfangen
				{
					ExecCommand("Paste", "");
					return false;
				}
			else if (objEvent.keyCode==13 && !objEvent.shiftKey)//Harten Zeilenumbruch in weichen Zeilenumbruch umbiegen
				{
					var objRange=objEditorDoc.selection.createRange();
 					objRange.text=objRange.text + String.fromCharCode(13);
 					objRange.moveStart("Character",0);
 					objRange.moveEnd("Character",0);
 					objRange.select();
 					return false;
 				}
		}

	function FontMinus()
		{
			if (iFontSizeIndex > 0)
				{
					iFontSizeIndex--;
					CheckBaseFont();
				}
			SetFocus();
		}

	function FontPlus()
		{
			if (iFontSizeIndex < 6)
				{
					iFontSizeIndex++;
					CheckBaseFont();
				}
			SetFocus();
		}

	function CharSortAToZ(a,b)
		{var Result=0;

			if (a.toUpperCase() > b.toUpperCase())
				{
					Result=1;
				}
			else if (a.toUpperCase() < b.toUpperCase())
				{
					Result=-1;
				}
			return Result;
		}

	function CharSortZToA(a,b)
		{var Result=0;

			if (a.toUpperCase() < b.toUpperCase())
				{
					Result=1;
				}
			else if (a.toUpperCase() > b.toUpperCase())
				{
					Result=-1;
				}
			return Result;
		}

	function ScanVariables(sSearchValue)
		{
			var sHtmlData=objEditorDoc.body.innerText;
			var sBuffer=sHtmlData;
			var sCheckBuffer="";
			var sVarName="";
			var sVarBuffer="";
			var iTestPos=0;
			var iPosStart=0;
			var iPosEnd=0;
			var fExit=false;
			var fAlreadyExists=false;
			var fIgnore=false;
			var sChar10=String.fromCharCode(10);
			var sChar13=String.fromCharCode(13);
			var sChar32=String.fromCharCode(32);

				while (!fExit)
					{
						fIgnore=false;
						fAlreadyExists=false;
						iPosStart=sBuffer.indexOf(sSearchValue);
						if (iPosStart == -1)
							break;

						sBuffer=sBuffer.slice(iPosStart);

						iPosEnd=sBuffer.indexOf(">");
						if (iPosEnd == -1)
							break;

						sCheckBuffer=sBuffer.slice(1);
						iTestPos=sCheckBuffer.indexOf(sSearchValue);
						if (iTestPos>-1 && iTestPos<iPosEnd)
							{
								sBuffer=sCheckBuffer.slice(iTestPos);
								iPosEnd=sBuffer.indexOf(">");
								if (iPosEnd == -1)
									break;
							}

						sVarName=sBuffer.slice(0,iPosEnd+1);

						if (sVarName.slice(0,3)=="<%<" || sVarName.indexOf("<%>")>-1 || sVarName.indexOf(" ")>-1 || sVarName.indexOf("=")>-1 || sVarName.indexOf(sChar10)>-1 || sVarName.indexOf(sChar13)>-1)
							fIgnore=true;

						if (!fIgnore)
							{
								if (sVarName.indexOf("=") == -1 && sVarName.indexOf("{") == -1 && sVarName.indexOf("}") == -1 && sVarName.indexOf(" ") == -1 && sVarName.indexOf("*") == -1)
									{
										if (sVarBuffer != "")
											{
												var CheckArray=sVarBuffer.split(",");
												for (i=0; i<CheckArray.length; i++)
													{
														if (CheckArray[i].toLowerCase() == sVarName.toLowerCase())
															{
																fAlreadyExists=true;
																break;
															}
													}
											}

										if (!fAlreadyExists)
											{
												sVarBuffer=sVarBuffer + sVarName + ",";
											}
									}
							}
						sBuffer=sBuffer.slice(iPosEnd+1);
					}
				return sVarBuffer.split(",");
		}

	function ColorizeVariables(sSearchValue,TextColor,BgColor,sVarType)
		{
			var oRange=null;
			var sBookMark=null;
			var VarArray=ScanVariables(sSearchValue);
			var sVarName="";
			var sCrlf="";
			var sCheck="";

			var sBuffer=objEditorDoc.body.innerHTML;

			for (var i=0; i<VarArray.length; i++)
				{
					if (VarArray[i] != "")
						{
							var sColorRangeText=VarArray[i];
							sColorRangeText=sColorRangeText.slice(1,sColorRangeText.length-1);

							if (sVarType == cIoVarType)//Benutzerdefinierte Variable
								{
									var sRegExp='/&lt;' + sColorRangeText + '&gt;/g';
									sBuffer=sBuffer.replace(eval(sRegExp),"&lt;<FONT eltname='" + sVarName + "' vartype='" + sVarType + "' style='BACKGROUND-COLOR: " + BgColor + "' color=" + TextColor + ">" + sColorRangeText + "</FONT>&gt;");
									CheckPredefinedEltTypes(sVarName);
								}
							else
								{									
									var sRegExp='/&lt;' + sColorRangeText.replace("/","\\/") + '&gt;/g';
									sBuffer=sBuffer.replace(eval(sRegExp),"&lt;<FONT vartype='" + sVarType + "' style='BACKGROUND-COLOR: " + BgColor + "' color=" + TextColor + ">" + sColorRangeText + "</FONT>&gt;");
								}
						}
				}

			objEditorDoc.body.innerHTML=sBuffer;

			CheckBaseFont();
			return VarArray;
		}

	function SetFrameHeight()
		{
			top.document.all.tags("IFRAME").item("ioEditor").style.height=document.body.offsetHeight-93+iOffsetHeight;

			document.all("BusyLabel").style.left=document.body.offsetWidth/2-150;
			document.all("BusyLabel").style.top=document.body.offsetHeight/2-20;

			document.all("SaveLabel").style.left=document.body.offsetWidth/2-150;
			document.all("SaveLabel").style.top=document.body.offsetHeight/2-20;

		}

	function ResizeWindow()
		{
		 var iWidth=window.screen.width/1.2;
		 var iHeight=window.screen.height/1.2;
		 var iLeft=window.screen.width/2 - iWidth/2;
		 var iTop=window.screen.height/2 - iHeight/2 - 25;

			window.moveTo(iLeft,iTop);
			window.resizeTo(iWidth,iHeight);
			SetFrameHeight();
		}

	function ShowBusyLabel()
		{
			document.all("BusyLabel").style.display="";
		}

	function HideBusyLabel()
		{
			document.all("BusyLabel").style.display="none";
		}

	function ShowOpener()
		{
			top.opener.top.focus();
		}	
	
	function HideOpener()
		{
			top.opener.top.blur();
		}	
		
	function Init()
		{
			window.setInterval("HideOpener()",50);
			document.body.style.visibility="";
			//ResizeWindow();
			SetFrameHeight();
			DesignModeOn();
			objEditorDoc.open();
			objEditorDoc.write("");
			objEditorDoc.close();

			if (document.all.ScriptVersionTemplateEditor.value!=cScriptVersionTemplateEditor)
				{
					alert("Old script version found. Please clear browser cache.");
					top.window.close();
				}

			if ((TemplateTempSourceCode != " " && TemplateTempSourceCode != "" && TemplateTempSourceCode != TemplateSourceCode) || (TemplateTempElementeCode != TemplateElementeCode && TemplateTempElementeCode !=""))
				{
					AskForLoadingTempData();
				}
			else
				{
					if (TempBuffer=="")
						{
							if (TemplateSourceCode == "")
								{
									OriginalData="";
								}
							else
								{
									OriginalData=unescape(TemplateSourceCode);
								}
						}
					else
						{
							OriginalData=TempBuffer;
						}

					SetPredefinedEltTypes(unescape(TemplateElementeCode));
					LoadAsciiText();

					OriginalHtmlData=objEditorDoc.body.innerHTML;
					//CheckAllVariables();
					//FillIoTypeCombo();
					//AddIoTypesToRedDotCombo();

					if (!fIE5_5 && !fIE6)
						{
							objRange=objEditorDoc.selection.createRange();
 							objRange.moveToPoint(0,0);
 							objRange.select();
 						}

					AddToUndoBuffer();
					XmlDecodeEltData();
					Undo();
					SetFocus();
				}
		}

	function AskForLoadingTempData()
		{
			var fClosed=false;
			var iWidth=600;
			var iHeight=250;
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
			objDialogWindow=window.open("ioAskForLoadingTempData.asp","_blank",'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,width=' + iWidth + ',height=' + iHeight + ',screenX=' + iLeft + ',screenY=' + iTop + ',left=' + iLeft + ',top=' + iTop);
		}

	function LoadTempData()
		{
			if (TempBuffer=="")
				{
					if (TemplateTempSourceCode == "")
						{
							OriginalData="";
						}
					else
						{
							OriginalData=unescape(TemplateTempSourceCode);
						}
				}
			else
				{
					OriginalData=TempBuffer;
				}
			SetPredefinedEltTypes(unescape(TemplateTempElementeCode));
			LoadAsciiText();
			OriginalHtmlData=objEditorDoc.body.innerHTML;
			//CheckAllVariables();
			//FillIoTypeCombo();
			//AddIoTypesToRedDotCombo();

			if (!fIE5_5 && !fIE6)
				{
					objRange=objEditorDoc.selection.createRange();
 					objRange.moveToPoint(0,0);
 					objRange.select();
 				}
			XmlDecodeEltData();
			AddToUndoBuffer();
			Undo();
			SetFocus();
		}

	function LoadData()
		{
			if (TempBuffer=="")
				{
					if (TemplateSourceCode == "")
						{
							OriginalData="";
						}
					else
						{
							OriginalData=unescape(TemplateSourceCode);
						}
				}
			else
				{
					OriginalData=TempBuffer;
				}
			SetPredefinedEltTypes(unescape(TemplateElementeCode));
			LoadAsciiText();
			OriginalHtmlData=objEditorDoc.body.innerHTML;
			//CheckAllVariables();
			//FillIoTypeCombo();
			//AddIoTypesToRedDotCombo();

			if (!fIE5_5 && !fIE6)
				{
					objRange=objEditorDoc.selection.createRange();
 					objRange.moveToPoint(0,0);
 					objRange.select();
 				}

			XmlDecodeEltData();
			AddToUndoBuffer();
			Undo();
			SetFocus();
		}

	function LoadAsciiText()
		{
			objEditorDoc.open();
			objEditorDoc.write("");
			objEditorDoc.close();

			var sCrlf=String.fromCharCode(13,10);
			objEditorDoc.body.innerText=OriginalData + sCrlf + sCrlf + sCrlf;

			if (objEditorDoc.body.innerHTML == "")
				objEditorDoc.body.innerHTML="&nbsp;";

			CheckBaseFont();
			objEditorDoc.dir=sContentTextDirection;
			SetFocus();
		}

	function ExecCommand(sCommand, sValue)
		{
			if (sCommand == "Paste" && (fIE5 || fIE6))
				{
					objRange=ioEditor.document.selection.createRange();
					if (window.clipboardData.getData("Text") != null)
						objRange.text=window.clipboardData.getData("Text");
				}
			else
				{
					objEditorDoc.execCommand(sCommand,"",sValue);
				}

			if (sCommand == "Paste")
				{
					RescanAllVariables();
				}
			SetFocus();
		}

	function NewText()
		{
			var sCrlf=String.fromCharCode(13,10);
			OriginalData=" "  + sCrlf + sCrlf + sCrlf;
			//objEditorDoc.open();
			//objEditorDoc.write("");
			//objEditorDoc.close();
			objEditorDoc.body.innerText=OriginalData;
			objRange=objEditorDoc.body.createTextRange();
 			objRange.moveToPoint(0,0);
 			objRange.select();

			CheckBaseFont();
			objEditorDoc.dir=sContentTextDirection;
			SetFocus();
		}

	function SetFocus()
		{
			frames.ioEditor.focus();
		}


	function Save()
		{
			if (objEditorDoc != null)
				{
					if (objEditorDoc.body != null)
						{
							document.all("SaveLabel").style.display="";
							window.clearInterval(InterV2);
							var objTemplateSourceCode=document.all.item("TemplateSourceCode");
							var objTemplateElementCode=document.all.item("TemplateElementeCode");
							var objcmbIoTypes=document.Editor.cmbIoTypes;

							objTemplateSourceCode.value=escape(objEditorDoc.body.innerText);

							var objDiv=ioEltTypesData.document.all.tags("DIV");

							for (var i=0; i<objDiv.length; i++)
								{
									XmlEncodeAttribute(objDiv(i),"eltstylesheetdata");
									XmlEncodeAttribute(objDiv(i),"elttype");
									XmlEncodeAttribute(objDiv(i),"eltevalcalledpage");
									XmlEncodeAttribute(objDiv(i),"eltdefaultvalue");
									XmlEncodeAttribute(objDiv(i),"eltcategorytype");																		
									XmlEncodeAttribute(objDiv(i),"eltrefelementguid");									
									XmlEncodeAttribute(objDiv(i),"eltdepth");
									XmlEncodeAttribute(objDiv(i),"eltdropouts");																		
									XmlEncodeAttribute(objDiv(i),"elttableopen");
									XmlEncodeAttribute(objDiv(i),"elttableclose");
									XmlEncodeAttribute(objDiv(i),"eltrowopen");
									XmlEncodeAttribute(objDiv(i),"eltrowclose");
									XmlEncodeAttribute(objDiv(i),"eltcolopen");
									XmlEncodeAttribute(objDiv(i),"eltcolclose");									
									XmlEncodeAttribute(objDiv(i),"eltrdexample");
									XmlEncodeAttribute(objDiv(i),"eltrdexampleguid");									
									XmlEncodeAttribute(objDiv(i),"eltattributeguid");									
									XmlEncodeAttribute(objDiv(i),"eltattributetype");																											
									XmlEncodeAttribute(objDiv(i),"eltcategoryguid");
									XmlEncodeAttribute(objDiv(i),"eltmediatypename");
									XmlEncodeAttribute(objDiv(i),"eltmediatypeattribute");																											
									XmlEncodeAttribute(objDiv(i),"eltrddescription");
									XmlEncodeAttribute(objDiv(i),"eltsearchdepth");
									XmlEncodeAttribute(objDiv(i),"eltonlyhrefvalue");
									XmlEncodeAttribute(objDiv(i),"eltpicsalllanguages");
									XmlEncodeAttribute(objDiv(i),"eltignoreworkflow");
									XmlEncodeAttribute(objDiv(i),"eltdonotremove");
									XmlEncodeAttribute(objDiv(i),"eltlanguageindependent");
									XmlEncodeAttribute(objDiv(i),"eltinvisibleinclient");
									XmlEncodeAttribute(objDiv(i),"eltinvisibleinpage");									
									XmlEncodeAttribute(objDiv(i),"eltprojectguid");
									XmlEncodeAttribute(objDiv(i),"elttemplateguid");
									XmlEncodeAttribute(objDiv(i),"eltelementguid");									
									XmlEncodeAttribute(objDiv(i),"elteditorialelement");
									XmlEncodeAttribute(objDiv(i),"eltbeginmark");
									XmlEncodeAttribute(objDiv(i),"eltendmark");
									XmlEncodeAttribute(objDiv(i),"eltuserdefinedallowed");
									XmlEncodeAttribute(objDiv(i),"eltdonothtmlencode");
									XmlEncodeAttribute(objDiv(i),"eltmaxsize");

									//LW 2002/07/17
									XmlEncodeAttribute(objDiv(i),"eltmaxpicwidth");
									XmlEncodeAttribute(objDiv(i),"eltmaxpicheight");

									XmlEncodeAttribute(objDiv(i),"eltmaxsize");
									XmlEncodeAttribute(objDiv(i),"eltfontclass");
									XmlEncodeAttribute(objDiv(i),"eltfontsize");
									XmlEncodeAttribute(objDiv(i),"eltfontcolor");
									XmlEncodeAttribute(objDiv(i),"eltfontface");
									XmlEncodeAttribute(objDiv(i),"eltwidth");
									XmlEncodeAttribute(objDiv(i),"eltheight");
									XmlEncodeAttribute(objDiv(i),"eltborder");
									XmlEncodeAttribute(objDiv(i),"eltvspace");
									XmlEncodeAttribute(objDiv(i),"elthspace");
									XmlEncodeAttribute(objDiv(i),"eltalign");
									XmlEncodeAttribute(objDiv(i),"eltusermap");
									XmlEncodeAttribute(objDiv(i),"eltsupplement");
									XmlEncodeAttribute(objDiv(i),"eltimagesupplement");
									XmlEncodeAttribute(objDiv(i),"eltpresetalt");
									XmlEncodeAttribute(objDiv(i),"eltalt");
									XmlEncodeAttribute(objDiv(i),"eltsrc");
									XmlEncodeAttribute(objDiv(i),"eltxslfile");
									XmlEncodeAttribute(objDiv(i),"eltshape");
									XmlEncodeAttribute(objDiv(i),"eltcoords");
									XmlEncodeAttribute(objDiv(i),"elttarget");
									XmlEncodeAttribute(objDiv(i),"eltfolderguid");
									XmlEncodeAttribute(objDiv(i),"eltconnectionguid");									
									XmlEncodeAttribute(objDiv(i),"eltprojectvariantguid");
									XmlEncodeAttribute(objDiv(i),"eltlanguagevariantguid");
									XmlEncodeAttribute(objDiv(i),"eltlanguagevariantid");
									XmlEncodeAttribute(objDiv(i),"eltrelatedfolderguid");
									XmlEncodeAttribute(objDiv(i),"eltsubtype");
									XmlEncodeAttribute(objDiv(i),"eltfontbold");
									XmlEncodeAttribute(objDiv(i),"elthittype");
									XmlEncodeAttribute(objDiv(i),"eltistargetcontainer");
									XmlEncodeAttribute(objDiv(i),"eltisdynamic");
									XmlEncodeAttribute(objDiv(i),"elthref");
									XmlEncodeAttribute(objDiv(i),"eltvalue");
									XmlEncodeAttribute(objDiv(i),"eltdefaultsuffix");
									XmlEncodeAttribute(objDiv(i),"wholetext");
									XmlEncodeAttribute(objDiv(i),"eltframename");
									XmlEncodeAttribute(objDiv(i),"eltmarginwidth");
									XmlEncodeAttribute(objDiv(i),"eltmarginheight");
									XmlEncodeAttribute(objDiv(i),"eltscrolling");
									XmlEncodeAttribute(objDiv(i),"eltnoresize");
									XmlEncodeAttribute(objDiv(i),"eltframeborder");
									XmlEncodeAttribute(objDiv(i),"eltcrlftobr");
									XmlEncodeAttribute(objDiv(i),"elteditoroptions");
									XmlEncodeAttribute(objDiv(i),"elteditalignleft");
									XmlEncodeAttribute(objDiv(i),"elteditaligncenter");
									XmlEncodeAttribute(objDiv(i),"elteditalignright");
									XmlEncodeAttribute(objDiv(i),"elteditfontbackcolor");
									XmlEncodeAttribute(objDiv(i),"elteditfontbold");
									XmlEncodeAttribute(objDiv(i),"elteditfonttype");
									XmlEncodeAttribute(objDiv(i),"elteditfontforecolor");
									XmlEncodeAttribute(objDiv(i),"elteditfontitalic");
									XmlEncodeAttribute(objDiv(i),"elteditfontsize");
									XmlEncodeAttribute(objDiv(i),"elteditfontunderline");
									XmlEncodeAttribute(objDiv(i),"elteditinsertpicture");
									XmlEncodeAttribute(objDiv(i),"elteditdefinemarker");
									XmlEncodeAttribute(objDiv(i),"elteditinsertmarker");
									XmlEncodeAttribute(objDiv(i),"elteditinsertlink");
									XmlEncodeAttribute(objDiv(i),"elteditinserttab");
									XmlEncodeAttribute(objDiv(i),"elteditinserttable");
									XmlEncodeAttribute(objDiv(i),"elteditinsertlist");
									XmlEncodeAttribute(objDiv(i),"elteditinsertnumb");
									XmlEncodeAttribute(objDiv(i),"elteditcleartab");
									XmlEncodeAttribute(objDiv(i),"elteditsubscript");
									XmlEncodeAttribute(objDiv(i),"elteditsuperscript");
									XmlEncodeAttribute(objDiv(i),"eltconvertmode");
									XmlEncodeAttribute(objDiv(i),"eltcompression");
									XmlEncodeAttribute(objDiv(i),"eltonlynonwebsources");
									XmlEncodeAttribute(objDiv(i),"elttargetformat");
									XmlEncodeAttribute(objDiv(i),"eltconvert");
									XmlEncodeAttribute(objDiv(i),"eltorientation");
									XmlEncodeAttribute(objDiv(i),"eltsuffixes");
									XmlEncodeAttribute(objDiv(i),"eltisreffield")
									XmlEncodeAttribute(objDiv(i),"eltlisttype");
									XmlEncodeAttribute(objDiv(i),"eltorderby");
									XmlEncodeAttribute(objDiv(i),"eltislistentry");
									XmlEncodeAttribute(objDiv(i),"eltlinksintext");
									XmlEncodeAttribute(objDiv(i),"eltissupplement");
									XmlEncodeAttribute(objDiv(i),"eltdatabasename");
									XmlEncodeAttribute(objDiv(i),"elttablename");
									XmlEncodeAttribute(objDiv(i),"eltcolumnname");
									XmlEncodeAttribute(objDiv(i),"eltbincolumnname");
									XmlEncodeAttribute(objDiv(i),"eltcolumntype");
									XmlEncodeAttribute(objDiv(i),"eltcolumniotype");
									XmlEncodeAttribute(objDiv(i),"eltdefaultinfo");
									XmlEncodeAttribute(objDiv(i),"eltformatbutton");
									XmlEncodeAttribute(objDiv(i),"eltformatno");
									XmlEncodeAttribute(objDiv(i),"eltformat");
									XmlEncodeAttribute(objDiv(i),"eltlcid");
									XmlEncodeAttribute(objDiv(i),"eltformatting");
									XmlEncodeAttribute(objDiv(i),"eltdirection");
									XmlEncodeAttribute(objDiv(i),"eltnextpagetype");
									XmlEncodeAttribute(objDiv(i),"eltdefaulttextguid");
									XmlEncodeAttribute(objDiv(i),"eltdefaulttext");
									XmlEncodeAttribute(objDiv(i),"eltoptionlistdata");
									XmlEncodeAttribute(objDiv(i),"eltfieldtype");
									XmlEncodeAttribute(objDiv(i),"eltparentelementguid");
									XmlEncodeAttribute(objDiv(i),"eltparentelementname");
									XmlEncodeAttribute(objDiv(i),"eltextendedlist");

									var sId=objDiv(i).id;

									//Attribut 'ID' entfernen
									if (fIE5 || fIE6)
										{
											objDiv(i).removeAttribute("id");
										}
									else
										{
											var sOuterHTML=objDiv(i).outerHTML;
											sOuterHTML=sOuterHTML.replace(/id=/,"");
											sOuterHTML=sOuterHTML.replace(sId,"");
											objDiv(i).outerHTML=sOuterHTML;
										}
								}
							var sBuffer=ioEltTypesData.document.body.innerHTML;
							sBuffer=sBuffer.replace(/&amp;lt;/g,"&lt;");
							sBuffer=sBuffer.replace(/&amp;gt;/g,"&gt;");
							objTemplateElementCode.value=escape(sBuffer);
						}
				}
			//alert(ioEltTypesData.document.body.innerHTML);

//LW 8.10.2001 Ueberpruefung aus oeffnende/schliessende Klammern erstmal deaktiviert
//			if (CheckSyntax())
//				document.Editor.submit();
//			else
//				document.all("SaveLabel").style.display="none"

			document.Editor.submit();
		}

	function BtUp(btName)
		{
			if (document.all(btName) != null)
				{
					with (document.all(btName).style)
						{
							borderLeftColor="#ffffff";
							borderTopColor="#ffffff";
							borderRightColor="#808080";
							borderBottomColor="#808080";
						}
				}
		}

	function BtDown(btName)
		{
			if (document.all(btName) != null)
				{
					with (document.all(btName).style)
						{
							borderLeftColor="#c0c0c0";
							borderTopColor="#c0c0c0";
							borderRightColor="#c0c0c0";
							borderBottomColor="#c0c0c0";
						}
				}
		}

	function BtInset(btName)
		{
			if (document.all(btName) != null)
				{
					with (document.all(btName).style)
						{
							borderLeftColor="#808080";
							document.all(btName).style.borderTopColor="#808080";
							document.all(btName).style.borderRightColor="#ffffff";
							document.all(btName).style.borderBottomColor="#ffffff";
						}
				}
		}

	function BtUp2(btName)
		{
			if (document.all(btName) != null)
				{
					with (document.all(btName).style)
						{
							backgroundPositionX=1;
							backgroundPositionY=1;
							borderLeft="1";
							borderLeftStyle="outset";
							borderTop="1";
							borderTopStyle="outset";
							borderRight="1";
							borderRightStyle="outset";
							borderBottom="1";
							borderBottomStyle="outset";
						}
				}
		}

	function BtDown2(btName)
		{
			if (document.all(btName) != null)
				{
					with (document.all(btName).style)
						{
							backgroundPositionX=2;
							backgroundPositionY=2;
							borderLeft="1";
							borderLeftStyle="none";
							borderTop="1";
							borderTopStyle="none";
							borderRight="1";
							borderRightStyle="none";
							borderBottom="1";
							borderBottomStyle="none";
						}
				}
		}

	function BtInset2(btName)
		{
			if (document.all(btName) != null)
				{
					with (document.all(btName).style)
						{
							backgroundPositionX=1;
							backgroundPositionY=1;
							borderLeft="1";
							borderLeftStyle="inset";
							borderTop="1";
							borderTopStyle="inset";
							borderRight="1";
							borderRightStyle="inset";
							borderBottom="1";
							borderBottomStyle="inset";
						}
				}
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

	function SelectRedDotType(iIndex)
		{
			if (iIndex >3)
			//if (iIndex >1)
				var sText="<!Io" + document.Editor.cmbRedDot.options[iIndex].text + ">";
			else
				sText=RedDotComboArray[iIndex-1];

			InsertStaticPlaceHolder(sText,cRed,cWhite,cRedDotType);
			document.Editor.cmbRedDot.selectedIndex=0;

			objRange=objEditorDoc.selection.createRange();
			var sBookMark = objRange.getBookmark();

			RescanAllVariables();

			objRange.moveEnd("character",-1);
			objRange.moveStart("character",1);
			objRange.moveToBookmark(sBookMark);
			objRange.select();

		}

	function SelectBlockType(iIndex)
		{
			InsertStaticBlockPlaceHolder(BlockTypesComboArray,iIndex,cBlack,cGreen);
			document.Editor.cmbBlockTypes.selectedIndex=0;
		}

	function SelectIoType(iIndex)
		{
			var sText="<%" + document.Editor.cmbIoTypes.options[iIndex].text + "%>";
			InsertStaticPlaceHolder(sText,cBlack,cYellow,cIoVarType);
			document.Editor.cmbIoTypes.selectedIndex=0;

			objRange=objEditorDoc.selection.createRange();
			var sBookMark = objRange.getBookmark();

			RescanAllVariables();

			objRange.moveToBookmark(sBookMark);
			objRange.moveEnd("character",-1);
			objRange.moveStart("character",1);
			objRange.select();

		}

	function FillIoTypeCombo()
		{
			var objcmbIoTypes=document.Editor.cmbIoTypes;

			for (var i=0;i<IoVarArray.length;i++)
				{
					if (IoVarArray[i] != "")
						{
							var objOption = document.createElement("OPTION");
							var sText=IoVarArray[i];
							var fFound=false;

							sText=sText.slice(2,sText.length-2);

							for (var i2=0; i2<objcmbIoTypes.options.length; i2++)
								{
									if (objcmbIoTypes.options[i2].text.toLowerCase() == sText.toLowerCase())
										{
											fFound=true;
											break;
										}
								}

							if (!fFound)
								{
									CheckPredefinedEltTypes(sText);
									objOption.text=sText;
									objOption.value=objcmbIoTypes.options.length-1;
									objcmbIoTypes.add(objOption);
								}
						}
				}
		}

	function AddIoTypesToRedDotCombo()
		{
			var sRedDotIoVar="";

			for (var i=0;i<IoVarArray.length;i++)
				{

					if (IoVarArray[i] != "")
						{
							var sValue=IoVarArray[i];
							sValue=sValue.slice(2,sValue.length-2);
							sValue="<!IoRedDot_" + sValue + ">";

							var fFound=false;
							for (var i2=0; i2<RedDotComboArray.length; i2++)
								{
									if (RedDotComboArray[i2].toLowerCase() == sValue.toLowerCase())
										{
											fFound=true;
											break;
										}
								}

							if (!fFound)
								{
									if (sRedDotIoVar != "")
										{
											var CheckArray=sRedDotIoVar.split(",");

											fFound=false;
											for (i3=0; i3<CheckArray.length; i3++)
												{
													if (CheckArray[i3].toLowerCase() == sValue.toLowerCase())
														{
															fFound=true;
															break;
														}
												}
										}

									if (!fFound && sValue != "")
										sRedDotIoVar=sRedDotIoVar + sValue + ",";
								}
						}
				}

			if (sRedDotIoVar != "")
				{
					while (sRedDotIoVar.substr(sRedDotIoVar.length-1,1) == ",")
						sRedDotIoVar=sRedDotIoVar.slice(0,sRedDotIoVar.length-1);
				}

			RedDotComboArray=RedDotComboArray.concat(sRedDotIoVar.split(","));

			for (var i=3;i<RedDotComboArray.length;i++)
			//for (var i=1;i<RedDotComboArray.length;i++)
				{
					fFound=false;

					if (RedDotComboArray[i] != "")
						{
							if (document.Editor.cmbRedDot.options[i+1] == null)
								{
									var sValue=RedDotComboArray[i];
									sValue=sValue.slice(4,sValue.length-1);

									for (var i2=0;i2<document.Editor.cmbRedDot.options.length;i2++)
										{
											if (document.Editor.cmbRedDot.options[i2].text.toLowerCase()==sValue.toLowerCase())
												{
													fFound=true;
													break;
												}
										}

									if (!fFound)
										{
											var objOption = document.createElement("OPTION");
											objOption.text=sValue;
											objOption.value=i;

											document.Editor.cmbRedDot.add(objOption);
										}
								}
						}
				}
		}

	function InsertStaticPlaceHolder(sText,TextColor,BgColor,sVarType)
		{
			SetFocus();
			var objRange=objEditorDoc.selection.createRange();
			var sCrlf="";
			var sCheck="";

			objRange.moveEnd("character",2);
			sCheck=objRange.text;
			objRange.moveEnd("character",-2);

			if(sCheck.lastIndexOf(String.fromCharCode(10)) != -1)//Zeilenumbruch erhalten
				sCrlf=String.fromCharCode(13,10);
			else
				sCrlf="";

			objRange.pasteHTML("<FONT vartype='" + sVarType + "' style='BACKGROUND-COLOR: " + BgColor + "' color=" + TextColor + ">{*}</FONT>");
			objRange = objEditorDoc.body.createTextRange();
			objRange.findText("{*}");
			sBookMark = objRange.getBookmark();
			objRange.moveToBookmark(sBookMark);
			objRange.select();
			objRange.text=sText + sCrlf;
			objRange.collapse();
			objRange.select();
			AddToUndoBuffer();
			SetFocus();
		}

	function InsertStaticBlockPlaceHolder(VarArray,iIndex,TextColor,BgColor)
		{
			SetFocus();
			var objRange=objEditorDoc.selection.createRange();
			var sText=objRange.text;
			var sCrlf="";
			var sCheck="";
			var sBlockText="";

			sBookMark = objRange.getBookmark();
			objRange.moveToBookmark(sBookMark);

			objRange.moveEnd("character",1);
			sCheck=objRange.text;
			objRange.moveEnd("character",-1);

			if(sCheck.lastIndexOf(String.fromCharCode(10)) != -1)//Zeilenumbruch erhalten
				sCrlf=String.fromCharCode(13,10);
			else
				sCrlf="";

			sBlockText=VarArray[iIndex] + sText + VarArray[Number(iIndex)+1] + sCrlf;

			if (sText == "")
				alert(ConvertToAscii(sLngId1074));
			else
				{
					objRange.text=sBlockText;
					RescanAllVariables();
				}

			AddToUndoBuffer();
			SetFocus();
		}

	function CheckAllVariables()
		{
			RedDotVarArray=ColorizeVariables("<!IoRedDot",cRed,cWhite,cRedDotType);
			BlockVarArray=ColorizeVariables("<!IoRange",cBlack,cGreen,cBlockType);
			BlockVarArray=ColorizeVariables("<!/IoRange",cBlack,cGreen,cBlockType);
			IoVarArray=ColorizeVariables("<%",cBlack,cYellow,cIoVarType);
			var sBuffer=objEditorDoc.body.innerHTML;
			objEditorDoc.body.innerHTML=sBuffer.replace(/{IO}/g,"");
		}

	function CreateNewPlaceHolder()
		{
			SetFocus();
			objRange=objEditorDoc.selection.createRange();
			var sHtmlCode=objEditorDoc.body.innerText;
			var fFound=false;
			var i=0;
			var sTagOuterHTML="";
			var fClearEltSettings=true;
			var sText="";
			sOldEltName="";

			//Parsen, ob direkt ein gueltiger Tag folgt
			var iOffset=objRange.text.length;
			objRange.moveStart("character",iOffset);
			for (i=0; i<10000; i++)//Notausstieg
				{
					objRange.moveEnd("character",1);
					sText=objRange.text;

					if (i>sHtmlCode.length)
						break;

					if (sText != '<' && i == 0 || sText == '<' && i > 0)
						break;

					if (sText.slice(i) == '>' && i > 0 && (sText.substr(i-1,2) != "%>"))
						{
							fFound=true;
							break;
						}
				}

			if (fFound)//Attribute analysieren
				{
					var objIoParseDataDoc=top.ioParseData.document;
					var fHeight=false;
					var fWidth=false;

					sTagOuterHTML=sText.slice(0,i+1);
					objIoParseDataDoc.open();
					objIoParseDataDoc.write(sTagOuterHTML);
					objIoParseDataDoc.close();

					if (objIoParseDataDoc.body.innerHTML != "")
						{
							ClearEltSettings();
							fClearEltSettings=false;
							var objTag=objIoParseDataDoc.all(4);

							if (sTagOuterHTML.match(/height=/i))
								fHeight=true;

							if (sTagOuterHTML.match(/width=/i))
								fWidth=true;

							for (var i=0; i<objTag.attributes.length; i++)
								{
									var sAttributeName=objTag.attributes[i].nodeName.toLowerCase();
									var sAttributeValue=objTag.attributes[i].nodeValue;

									if (sAttributeValue != null)
										{
											if (sAttributeName.match(/height/i) && fHeight)
												EltHeight=objTag.height;
											else if (sAttributeName.match(/width/i) && fWidth)
												EltWidth=objTag.width;
											else if (!sAttributeName.match(/height/i) && !sAttributeName.match(/width/i))
												{
													if (sAttributeValue != null)
														{
															switch (sAttributeName)
																{
																	case "align":
																		EltAlign=objTag.align;
																		break;
																	case "alt":
																		EltAlt=objTag.alt;
																		break;
																	case "border":
																		EltBorder=objTag.border;
																		break;
																	case "face":
																		EltFontFace=objTag.face;
																		break;
																	case "href"	:
																		EltHref=objTag.href;
																		break;
																	case "hspace":
																		EltHSpace=objTag.hspace;
																		break;
																	case "size":
																		EltFontSize=objTag.size;
																		break;
																	case "src":
																		EltSrc=objTag.src;
																		break;
																	case "target":
																		EltTarget=objTag.target;
																		break;
																	case "usermap":
																		EltUserMap=objTag.usermap;
																		break;
																	case "vspace":
																		EltVSpace=objTag.vspace;
																		break;
																}
														}
												}
										}
								}
						}
				}

			objRange.moveStart("character",-iOffset);
			objRange.moveEnd("character",-sText.length);

			var objParentElt=objRange.parentElement();
			var sEltName="<" + objParentElt.innerText + ">";
			var fFound=false;

			for (i=0; i<IoVarArray.length; i++)
				{
					if (IoVarArray[i] == sEltName)
						{
							fFound=true;
							break;
						}
				}

			if (fFound)
				EditPlaceHolder();
			else
				{
					/*if (objRange.text == "")
						alert(ConvertToAscii(sLngId1074));
					else*/
						{
							fCreateNewElement=true;

							if (fClearEltSettings)
								ClearEltSettings();

							OpenWindow("ioFrame4120.htm");
						}
				}
		}

	function EditPlaceHolder()
		{
			SetFocus();
			objRange=objEditorDoc.selection.createRange();
			var objParentElt=objRange.parentElement();
			var sEltName=objParentElt.innerText;

			fCreateNewElement=false;
			sEltName=sEltName.slice(1,sEltName.length-1);
			sOldEltName=sEltName;

			if (sEltName != "")
				{
					var objDiv=ioEltTypesData.document.all.tags("DIV");
					var objElt=objDiv("io" + sEltName);
					if (objElt != null)
						{
							ReadEltSettings(sEltName);
							OpenWindow("ioFrame4120.htm");
						}
				}
		}

	function GetEltAttribute(sEltName, sAttribute)
		{
			var objDiv=ioEltTypesData.document.all.tags("DIV");
			var objElt=objDiv("io" + sEltName);
			var sValue=String(objElt.getAttribute(sAttribute));

			if (sValue == "null")
				sValue="";

			return sValue;
		}

	function ClearEltSettings()
		{
			EltType="";
			EltEvalCalledPage="";
			EltUseMainLink="";
			EltDefaultValue="";
			EltCategoryType="";
			EltRefElementGuid="";
			EltDepth="";
			EltDropOuts="";
			EltTableOpen="";
			EltTableClose="";
			EltRowOpen="";
			EltRowClose="";
			EltColOpen="";
			EltColClose="";				
			EltName="";
			EltGuid="";
			EltRDDescription="";
			EltSearchDepth="";
			EltRDExample="";
			EltRDExampleGuid="";			
			EltAttributeGuid="";
			EltAttributeType="";
			EltCategoryGuid="";
			EltMediaTypeName="";
			EltMediaTypeAttribute="";						
			EltOnlyHrefValue="";
			EltRequired="";
			EltDeactivateTextFilter="";
			EltKeywordSeparator="";
			EltUseSSL="";
			EltPicsAllLanguages="";
			EltIgnoreWorkflow="";
			EltDoNotRemove="";
			EltLanguageIndependent="";
			EltInvisibleInClient="";
			EltInvisibleInPage="";
			EltProjectGuid=""; 
			EltTemplateGuid=""; 
			EltElementGuid=""; 
			EltEditorialElement="";
			EltBeginMark="";
			EltEndMark="";
			EltUserDefinedAllowed="";
			EltDoNotHtmlEncode="";
			EltMaxSize="";

			//LW 2002/07/17
			EltMaxPicWidth="";
			EltMaxPicHeight="";

			EltFontClass="";
			EltFontSize="";
			EltFontColor="";
			EltFontFace="";
			EltWidth="";
			EltHeight="";
			EltBorder="";
			EltVSpace="";
			EltHSpace="";
			EltAlign="";
			EltUserMap="";
			EltSupplement="";
			EltImageSupplement="";
			EltPresetAlt="";
			EltAlt="";
			EltSrc="";
			EltXslFile="";
			EltShape="";
			EltCoords="";
			EltTarget="";
			EltFolderGuid="";
			EltConnectionGuid="";
			EltProjectVariantGuid="";
			EltLanguageVariantGuid="";
			EltLanguageVariantId="";
			EltRelatedFolderGuid="";
			EltSubType="";
			EltFontBold="";
			EltHitType="";
			EltIsTargetContainer="";
			EltIsDynamic="";
			EltHref="";
			EltValue="";
			EltDefaultSuffix="";
			EltWholeText="";
			EltFrameName="";
			EltMarginWidth="";
			EltMarginHeight="";
			EltScrolling="";
			EltNoResize="";
			EltFrameBorder="";
			EltCrlfToBr="";
			EltEditorOptions="";
			EltEditAlignLeft="";
			EltEditAlignCenter="";
			EltEditAlignRight="";
			EltEditFontBackColor="";
			EltEditFontBold="";
			EltEditFontType="";
			EltEditFontForeColor="";
			EltEditFontItalic="";
			EltEditFontSize="";
			EltEditFontUnderline="";
			EltEditInsertPicture="";
			EltEditDefineMarker="";
			EltEditInsertMarker="";
			EltEditInsertLink="";
			EltEditInsertTab="";
			EltEditInsertTable="";
			EltEditInsertList="";
			EltEditInsertNumb="";
			EltEditClearTab="";
			EltEditSubscript="";
			EltEditSuperscript="";
			EltConvertMode="";
			EltCompression="";
			EltOnlyNonWebSources="";
			EltTargetFormat="";
			EltConvert="";
			EltOrientation="";
			EltSuffixes="";
			EltIsRefField="";
			EltListType="";
			EltOrderBy="";
			EltIsListEntry="";
			EltLinksInText="";
			EltIsSupplement="";
			EltDatabaseName="";
			EltTableName="";
			EltColumnName="";
			EltBinColumnName="";
			EltColumnType="";
			EltColumnIOType="";
			EltDefaultInfo="";
			EltFormatButton="";
			EltFormatNo="";
			EltFormat="";
			EltLcId="";
			EltFormatting="";
			EltDirection="";
			EltNextPageType="";
			EltDefaultTextGuid="";
			EltDefaultText="";
			EltOptionListData="";
			EltFieldType="";
			EltParentElementGUID="";
			EltParentElementName="";
			EltExtendedList="";
		}

	function ReadEltSettings(sEltName)
		{
			ClearEltSettings();
			EltName=XmlDecode(GetEltAttribute(sEltName, "eltname"));
			EltType=XmlDecode(GetEltAttribute(sEltName, "elttype"));
			EltEvalCalledPage=XmlDecode(GetEltAttribute(sEltName, "eltevalcalledpage"));
			EltUseMainLink=XmlDecode(GetEltAttribute(sEltName, "eltusemainlink"));
			EltDefaultValue=XmlDecode(GetEltAttribute(sEltName, "eltdefaultvalue"));
			EltCategoryType=XmlDecode(GetEltAttribute(sEltName, "eltcategorytype"));
			EltRefElementGuid=XmlDecode(GetEltAttribute(sEltName, "eltrefelementguid"));
			EltDepth=XmlDecode(GetEltAttribute(sEltName, "eltdepth"));
  		EltDropOuts=XmlDecode(GetEltAttribute(sEltName, "eltdropouts"));						
			EltTableOpen=XmlDecode(GetEltAttribute(sEltName, "elttableopen"));
			EltTableClose=XmlDecode(GetEltAttribute(sEltName, "elttableclose"));
			EltRowOpen=XmlDecode(GetEltAttribute(sEltName, "eltrowopen"));
			EltRowClose=XmlDecode(GetEltAttribute(sEltName, "eltrowclose"));
			EltColOpen=XmlDecode(GetEltAttribute(sEltName, "eltcolopen"));
			EltColClose=XmlDecode(GetEltAttribute(sEltName, "eltcolclose"));			
			EltGuid=XmlDecode(GetEltAttribute(sEltName, "guid"));//!!!Achtung!!! Ohne 'elt'!!!
			EltRDDescription=XmlDecode(GetEltAttribute(sEltName, "eltrddescription"));
			EltSearchDepth=XmlDecode(GetEltAttribute(sEltName, "eltsearchdepth"));
			EltRDExample=XmlDecode(GetEltAttribute(sEltName, "eltrdexample"));
			EltRDExampleGuid=XmlDecode(GetEltAttribute(sEltName, "eltrdexampleguid"));			
			EltAttributeGuid=XmlDecode(GetEltAttribute(sEltName, "eltattributeguid"));												
			EltAttributeType=XmlDecode(GetEltAttribute(sEltName, "eltattributetype"));																					
			EltCategoryGuid=XmlDecode(GetEltAttribute(sEltName, "eltcategoryguid"));						
			EltMediaTypeName=XmlDecode(GetEltAttribute(sEltName, "eltmediatypename"));
			EltMediaTypeAttribute=XmlDecode(GetEltAttribute(sEltName, "eltmediatypeattribute"));												
			EltOnlyHrefValue=XmlDecode(GetEltAttribute(sEltName, "eltonlyhrefvalue"));
			EltRequired=XmlDecode(GetEltAttribute(sEltName, "eltrequired"));
			EltDeactivateTextFilter=XmlDecode(GetEltAttribute(sEltName, "eltdeactivatetextfilter"));
			EltKeywordSeparator=XmlDecode(GetEltAttribute(sEltName, "eltkeywordseparator"));									
			EltUseSSL=XmlDecode(GetEltAttribute(sEltName, "eltusessl"));
			EltPicsAllLanguages=XmlDecode(GetEltAttribute(sEltName, "eltpicsalllanguages"));		
			EltIgnoreWorkflow=XmlDecode(GetEltAttribute(sEltName, "eltignoreworkflow"));
			EltDoNotRemove=XmlDecode(GetEltAttribute(sEltName, "eltdonotremove"));
			EltLanguageIndependent=XmlDecode(GetEltAttribute(sEltName, "eltlanguageindependent"));			
			EltInvisibleInClient=XmlDecode(GetEltAttribute(sEltName, "eltinvisibleinclient"));
			EltInvisibleInPage=XmlDecode(GetEltAttribute(sEltName, "eltinvisibleinpage"));			
			EltProjectGuid=XmlDecode(GetEltAttribute(sEltName, "eltprojectguid"));
			EltTemplateGuid=XmlDecode(GetEltAttribute(sEltName, "elttemplateguid"));
			EltElementGuid=XmlDecode(GetEltAttribute(sEltName, "eltelementguid"));						
			EltEditorialElement=XmlDecode(GetEltAttribute(sEltName, "elteditorialelement"));
			EltBeginMark=XmlDecode(GetEltAttribute(sEltName, "eltbeginmark"));
			EltEndMark=XmlDecode(GetEltAttribute(sEltName, "eltendmark"));
			EltUserDefinedAllowed=XmlDecode(GetEltAttribute(sEltName, "eltuserdefinedallowed"));
			EltDoNotHtmlEncode=XmlDecode(GetEltAttribute(sEltName, "eltdonothtmlencode"));
			EltMaxSize=XmlDecode(GetEltAttribute(sEltName, "eltmaxsize"));

			//LW 2002/07/17
			EltMaxPicWidth=XmlDecode(GetEltAttribute(sEltName, "eltmaxpicwidth"));
			EltMaxPicHeight=XmlDecode(GetEltAttribute(sEltName, "eltmaxpicheight"));

			EltFontClass=XmlDecode(GetEltAttribute(sEltName, "eltfontclass"));
			EltFontSize=XmlDecode(GetEltAttribute(sEltName, "eltfontsize"));
			EltFontColor=XmlDecode(GetEltAttribute(sEltName, "eltfontcolor"));
			EltFontFace=XmlDecode(GetEltAttribute(sEltName, "eltfontface"));
			EltWidth=XmlDecode(GetEltAttribute(sEltName, "eltwidth"));
			EltHeight=XmlDecode(GetEltAttribute(sEltName, "eltheight"));
			EltBorder=XmlDecode(GetEltAttribute(sEltName, "eltborder"));
			EltVSpace=XmlDecode(GetEltAttribute(sEltName, "eltvspace"));
			EltHSpace=XmlDecode(GetEltAttribute(sEltName, "elthspace"));
			EltAlign=XmlDecode(GetEltAttribute(sEltName, "eltalign"));
			EltUserMap=XmlDecode(GetEltAttribute(sEltName, "eltusermap"));
			EltSupplement=XmlDecode(GetEltAttribute(sEltName, "eltsupplement"));
			EltImageSupplement=XmlDecode(GetEltAttribute(sEltName, "eltimagesupplement"));
			EltPresetAlt=XmlDecode(GetEltAttribute(sEltName, "eltpresetalt"));
			EltAlt=XmlDecode(GetEltAttribute(sEltName, "eltalt"));
			EltSrc=XmlDecode(GetEltAttribute(sEltName, "eltsrc"));			
			EltXslFile=XmlDecode(GetEltAttribute(sEltName, "eltxslfile"));
			EltCoords=XmlDecode(GetEltAttribute(sEltName, "eltcoords"));
			EltTarget=XmlDecode(GetEltAttribute(sEltName, "elttarget"));
			EltShape=XmlDecode(GetEltAttribute(sEltName, "eltshape"));
			EltFolderGuid=XmlDecode(GetEltAttribute(sEltName, "eltfolderguid"));			
			EltConnectionGuid=XmlDecode(GetEltAttribute(sEltName, "eltconnectionguid"));			
			EltProjectVariantGuid=XmlDecode(GetEltAttribute(sEltName, "eltprojectvariantguid"));
			EltLanguageVariantGuid=XmlDecode(GetEltAttribute(sEltName, "eltlanguagevariantguid"));
			EltLanguageVariantId=XmlDecode(GetEltAttribute(sEltName, "eltlanguagevariantid"));
			EltRelatedFolderGuid=XmlDecode(GetEltAttribute(sEltName, "eltrelatedfolderguid"));
			EltSubType=XmlDecode(GetEltAttribute(sEltName, "eltsubtype"));
			EltFontBold=XmlDecode(GetEltAttribute(sEltName, "eltfontbold"));
			EltHitType=XmlDecode(GetEltAttribute(sEltName, "elthittype"));
			EltIsTargetContainer=XmlDecode(GetEltAttribute(sEltName, "eltistargetcontainer"));
			EltIsDynamic=XmlDecode(GetEltAttribute(sEltName, "eltisdynamic"));
			EltHref=XmlDecode(GetEltAttribute(sEltName, "elthref"));
			EltValue=XmlDecode(GetEltAttribute(sEltName, "eltvalue"));
			EltWholeText=XmlDecode(GetEltAttribute(sEltName, "eltwholetext"));
			EltFrameName=XmlDecode(GetEltAttribute(sEltName, "eltframename"));
			EltMarginWidth=XmlDecode(GetEltAttribute(sEltName, "eltmarginwidth"));
			EltMarginHeight=XmlDecode(GetEltAttribute(sEltName, "eltmarginheight"));
			EltScrolling=XmlDecode(GetEltAttribute(sEltName, "eltscrolling"));
			EltNoResize=XmlDecode(GetEltAttribute(sEltName, "eltnoresize"));
			EltFrameBorder=XmlDecode(GetEltAttribute(sEltName, "eltframeborder"));
			EltCrlfToBr=XmlDecode(GetEltAttribute(sEltName, "eltcrlftobr"));
			EltEditorOptions=XmlDecode(GetEltAttribute(sEltName, "elteditoroptions"));
			EltEditAlignLeft=XmlDecode(GetEltAttribute(sEltName, "elteditalignleft"));
			EltEditAlignCenter=XmlDecode(GetEltAttribute(sEltName, "elteditaligncenter"));
			EltEditAlignRight=XmlDecode(GetEltAttribute(sEltName, "elteditalignright"));
			EltEditFontBackColor=XmlDecode(GetEltAttribute(sEltName, "elteditfontbackcolor"));
			EltEditFontBold=XmlDecode(GetEltAttribute(sEltName, "elteditfontbold"));
			EltEditFontType=XmlDecode(GetEltAttribute(sEltName, "elteditfonttype"));
			EltEditFontForeColor=XmlDecode(GetEltAttribute(sEltName, "elteditfontforecolor"));
			EltEditFontItalic=XmlDecode(GetEltAttribute(sEltName, "elteditfontitalic"));
			EltEditFontSize=XmlDecode(GetEltAttribute(sEltName, "elteditfontsize"));
			EltEditFontUnderline=XmlDecode(GetEltAttribute(sEltName, "elteditfontunderline"));
			EltEditInsertPicture=XmlDecode(GetEltAttribute(sEltName, "elteditinsertpicture"));
			EltEditDefineMarker=XmlDecode(GetEltAttribute(sEltName, "elteditdefinemarker"));
			EltEditInsertMarker=XmlDecode(GetEltAttribute(sEltName, "elteditinsertmarker"));
			EltEditInsertLink=XmlDecode(GetEltAttribute(sEltName, "elteditinsertlink"));
			EltEditInsertTab=XmlDecode(GetEltAttribute(sEltName, "elteditinserttab"));
			EltEditInsertTable=XmlDecode(GetEltAttribute(sEltName, "elteditinserttable"));
			EltEditInsertList=XmlDecode(GetEltAttribute(sEltName, "elteditinsertlist"));
			EltEditInsertNumb=XmlDecode(GetEltAttribute(sEltName, "elteditinsertnumb"));
			EltEditClearTab=XmlDecode(GetEltAttribute(sEltName, "elteditcleartab"));
			EltEditSubscript=XmlDecode(GetEltAttribute(sEltName, "elteditsubscript"));
			EltEditSuperscript=XmlDecode(GetEltAttribute(sEltName, "elteditsuperscript"));
			EltConvertMode=XmlDecode(GetEltAttribute(sEltName, "eltconvertmode"));
			EltCompression=XmlDecode(GetEltAttribute(sEltName, "eltcompression"));
			EltOnlyNonWebSources=XmlDecode(GetEltAttribute(sEltName, "eltonlynonwebsources"));
			EltTargetFormat=XmlDecode(GetEltAttribute(sEltName, "elttargetformat"));
			EltConvert=XmlDecode(GetEltAttribute(sEltName, "eltconvert"));
			EltOrientation=XmlDecode(GetEltAttribute(sEltName, "eltorientation"));
			EltSuffixes=XmlDecode(GetEltAttribute(sEltName, "eltsuffixes"));
			EltIsRefField=XmlDecode(GetEltAttribute(sEltName, "eltisreffield"));
			EltListType=XmlDecode(GetEltAttribute(sEltName, "eltlisttype"));
			EltOrderBy=XmlDecode(GetEltAttribute(sEltName, "eltorderby"));
			EltIsListEntry=XmlDecode(GetEltAttribute(sEltName, "eltislistentry"));
			EltLinksInText=XmlDecode(GetEltAttribute(sEltName, "eltlinksintext"));
			EltIsSupplement=XmlDecode(GetEltAttribute(sEltName, "eltissupplement"));
			EltDatabaseName=XmlDecode(GetEltAttribute(sEltName, "eltdatabasename"));
			EltTableName=XmlDecode(GetEltAttribute(sEltName, "elttablename"));
			EltColumnName=XmlDecode(GetEltAttribute(sEltName, "eltcolumnname"));
			EltBinColumnName=XmlDecode(GetEltAttribute(sEltName, "eltbincolumnname"));
			EltColumnType=XmlDecode(GetEltAttribute(sEltName, "eltcolumntype"));
			EltColumnIOType=XmlDecode(GetEltAttribute(sEltName, "eltcolumniotype"));
			EltDefaultInfo=XmlDecode(GetEltAttribute(sEltName, "eltdefaultinfo"));
			EltFormatButton=XmlDecode(GetEltAttribute(sEltName, "eltformatbutton"));
			EltFormatNo=XmlDecode(GetEltAttribute(sEltName, "eltformatno"));
			EltFormat=XmlDecode(GetEltAttribute(sEltName, "eltformat"));
			EltLcId=XmlDecode(GetEltAttribute(sEltName, "eltlcid"));
			EltFormatting=XmlDecode(GetEltAttribute(sEltName, "eltformatting"));
			EltDirection=XmlDecode(GetEltAttribute(sEltName, "eltdirection"));
			EltNextPageType=XmlDecode(GetEltAttribute(sEltName, "eltnextpagetype"));			
			EltDefaultTextGuid=XmlDecode(GetEltAttribute(sEltName, "eltdefaulttextguid"));
			EltDefaultText=XmlDecode(GetEltAttribute(sEltName, "eltdefaulttext"));
			EltFieldType=XmlDecode(GetEltAttribute(sEltName, "eltfieldtype"));
			EltParentElementGUID="";//XmlDecode(GetEltAttribute(sEltName, "eltparentelementguid"));//Immer loeschen!
			EltParentElementName=XmlDecode(GetEltAttribute(sEltName, "eltparentelementname"));
			EltExtendedList=XmlDecode(GetEltAttribute(sEltName, "eltextendedlist"));
			EltDefaultSuffix=XmlDecode(GetEltAttribute(sEltName, "eltdefaultsuffix"));
			//EltOptionListData=XmlDecode(GetEltAttribute(sEltName, "eltoptionlistdata"));
			EltOptionListData=(GetEltAttribute(sEltName, "eltoptionlistdata"));
		}

	function SetPredefinedEltTypes(EltTypesDataA)
		{
			var sInnerHtml=ioEltTypesData.document.body.innerHTML;
			sInnerHtml=sInnerHtml+EltTypesDataA;
			ioEltTypesData.document.body.innerHTML=sInnerHtml;
			var objDiv=ioEltTypesData.document.all.tags("DIV");			

			for (var i=0; i<objDiv.length; i++)
				{
					objDiv[i].id="io" + objDiv[i].eltname;
					var sEltName=objDiv[i].eltname;
					PredefinedEltTypesArray[PredefinedEltTypesArray.length]=sEltName;
				}

			PredefinedEltTypesArray.sort(CharSortAToZ);

			for (var i=0; i<PredefinedEltTypesArray.length; i++)
				{
					sEltName=PredefinedEltTypesArray[i];
					IoVarArray[IoVarArray.length]="<%" + sEltName + "%>";
					RedDotComboArray[RedDotComboArray.length]="<!IoRedDot_" + sEltName + ">";

					var objOption = document.createElement("OPTION");
					objOption.text=sEltName;
					objOption.value=IoVarArray.length-1;
					document.Editor.cmbIoTypes.add(objOption);

					var objOption = document.createElement("OPTION");
					objOption.text="RedDot_" + sEltName;
					objOption.value=RedDotComboArray.length-1;
					document.Editor.cmbRedDot.add(objOption);
				}
		}

	function CheckPredefinedEltTypes(sEltName)
		{
			var objDiv=ioEltTypesData.document.all.tags("DIV");

			if (objDiv("io" + sEltName) == null)//Neue Variable hinzufuegen
				{
					var sInnerHtml=ioEltTypesData.document.body.innerHTML;
					sInnerHtml=sInnerHtml + '<DIV id="' + 'io' + sEltName + '" eltname="' + sEltName + '">';
					ioEltTypesData.document.body.innerHTML=sInnerHtml;
				}
		}

	function InsertNewElement()
		{
			sOldEltName="";
			CheckPredefinedEltTypes(EltName);
			var objDiv=ioEltTypesData.document.all.tags("DIV");
			var objElt=objDiv("io" + EltName);

			SetAttributes(objElt);
			RemoveNoUsedAttributes(objElt);

			IoVarArray[IoVarArray.length]="<%" + EltName + "%>";
			RedDotComboArray[RedDotComboArray.length]="<!IoRedDot_" + EltName + ">";

			var objOption = document.createElement("OPTION");
			objOption.text=EltName;
			objOption.value=IoVarArray.length-1;
			document.Editor.cmbIoTypes.add(objOption);

			var objOption = document.createElement("OPTION");
			objOption.text="RedDot_" + EltName;
			objOption.value=RedDotComboArray.length-1;
			document.Editor.cmbRedDot.add(objOption);

			InsertStaticPlaceHolder("<%" + EltName + "%>",cBlack,cYellow,cIoVarType);
			SaveTempData();
			RescanAllVariables();
			AddToUndoBuffer();
			SetFocus();
		}

	function UpdateElement()
		{
			var fDoNotAdd=false;
			var fEltNameChanged=false;
			
			for (var i=0; i<IoVarArray.length; i++)
				{
					if (IoVarArray[i].toLowerCase() == "<%" + sOldEltName.toLowerCase() + "%>")
						{
								{
									fEltNameChanged=sOldEltName.toLowerCase()!=EltName.toLowerCase();
									
									IoVarArray[i]="<%" + EltName + "%>";
									for (var i2=0;i2<document.Editor.cmbIoTypes.length;i2++)
										{
											if(document.Editor.cmbIoTypes.options(i2).text.toLowerCase()==sOldEltName.toLowerCase())
												{
													document.Editor.cmbIoTypes.options(i2).text=EltName;
													break;
												}
										}
									for (var i2=4;i2<document.Editor.cmbRedDot.length;i2++)
										{
											var sRDCheck=document.Editor.cmbRedDot.options(i2).text.toLowerCase();
											sRDCheck=sRDCheck.substr(7);
											if(sRDCheck==sOldEltName.toLowerCase())
												{
													document.Editor.cmbRedDot.options(i2).text="RedDot_" + EltName;
													break;
												}
										}

									var objDiv=ioEltTypesData.document.all.tags("DIV");
									var objElt=objDiv("io" + sOldEltName);
									objElt.id="io" + EltName;
									objElt.eltname=EltName;
									
									
									if (fEltNameChanged)
										{
											for (var i3=0; i3<objDiv.length; i3++)
												{
													var sEltParentElementName=objDiv(i3).getAttribute("eltparentelementname");
													
													if (sEltParentElementName)
														{
															if (sEltParentElementName==sOldEltName)
																objDiv(i3).eltparentelementname=EltName;
														}

													var sEltMediaTypeName=objDiv(i3).getAttribute("eltmediatypename");
													
													if (sEltMediaTypeName)
														{
															if (sEltMediaTypeName==sOldEltName)
																objDiv(i3).eltmediatypename=EltName;
														}
												}
										}
								}

							fDoNotAdd=true;
							break;
						}
				}

			CheckPredefinedEltTypes(EltName);
			var objDiv=ioEltTypesData.document.all.tags("DIV");
			var objElt=objDiv("io" + EltName);

			SetAttributes(objElt);
			RemoveNoUsedAttributes(objElt);

			if (!fDoNotAdd)
				{
					IoVarArray[IoVarArray.length]="<%" + EltName + "%>";
					RedDotComboArray[RedDotComboArray.length]="<!IoRedDot_" + EltName + ">";

					var objOption = document.createElement("OPTION");
					objOption.text=EltName;
					objOption.value=IoVarArray.length-1;
					document.Editor.cmbIoTypes.add(objOption);

					var objOption = document.createElement("OPTION");
					objOption.text="RedDot_" + EltName;
					objOption.value=RedDotComboArray.length-1;
					document.Editor.cmbRedDot.add(objOption);
				}



			var objRange=objEditorDoc.selection.createRange();
			var objParentElt=objRange.parentElement();

			var sCrlf="";
			var sRangeCheck=objParentElt.innerText;
			if (sRangeCheck.substr(0,1)=="%" && sRangeCheck.substr(sRangeCheck.length-1,1)=="%")
				objParentElt.innerText="%" + EltName + "%" + sCrlf;

			if (sOldEltName.toLowerCase()!=EltName.toLowerCase())
				{
					AutoSearchReplace("!IoRedDot_" + sOldEltName, "!IoRedDot_" + EltName);
					AutoSearchReplace("%" + sOldEltName + "%", "%" + EltName + "%");
					objRange.collapse();
					objRange.select();
					AddToUndoBuffer();//Nur puffern, wenn Name geaendert
				}

			SetFocus();
			SaveTempData();

		}

	function OpenWindow(URL)
		{var fClosed=false;
		 var iWidth=650;
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
			objDialogWindow=window.open(URL,"_blank",'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,width=' + iWidth + ',height=' + iHeight + ',screenX=' + iLeft + ',screenY=' + iTop + ',left=' + iLeft + ',top=' + iTop);
		}

	function RescanAllVariables()
		{
			ShowBusyLabel();
			window.setTimeout("StartScan()",5);
		}

	function StartScan()
		{
			var objRange=objEditorDoc.selection.createRange();
			var sBookMark = objRange.getBookmark();

			var sBuffer=objEditorDoc.body.innerText;						
			var sCrlf=String.fromCharCode(13,10);

			objEditorDoc.body.innerText=sBuffer + sCrlf + " ";
			ColorizeCISTags();			
			objEditorDoc.execCommand("SelectAll","","");
			CheckAllVariables();
			FillIoTypeCombo();
			AddIoTypesToRedDotCombo();
			objRange.moveToBookmark(sBookMark);
			objRange.collapse();
			objRange.select();
			SetFocus();
			HideBusyLabel();
		}

	function RemoveNoUsedAttributes(objElt)//ueberfluessige Attribute entfernen
		{
			if (fIE5 || fIE6)
				{
					if (EltType == "")
						objElt.removeAttribute("elttype");

					if (EltEvalCalledPage == "")
						objElt.removeAttribute("eltevalcalledpage");

					if (EltUseMainLink == "")
						objElt.removeAttribute("eltusemainlink");

					if (EltDefaultValue == "")
						objElt.removeAttribute("eltdefaultvalue");

					if (EltDepth == "")
						objElt.removeAttribute("eltdepth");
						
					if (EltCategoryType == "")
						objElt.removeAttribute("eltcategorytype");

					if (EltRefElementGuid == "")
						objElt.removeAttribute("eltrefelementguid");

					if (EltDropOuts == "")
						objElt.removeAttribute("eltdropouts");

					if (EltTableOpen == "")
						objElt.removeAttribute("elttableopen");

					if (EltTableClose == "")
						objElt.removeAttribute("elttableclose");

					if (EltRowOpen == "")
						objElt.removeAttribute("eltrowopen");

					if (EltRowClose == "")
						objElt.removeAttribute("eltrowclose");

					if (EltColOpen == "")
						objElt.removeAttribute("eltcolopen");

					if (EltColClose == "")
						objElt.removeAttribute("eltcolclose");

					if (EltRDExample == "")
						objElt.removeAttribute("eltrdexample");

					if (EltRDExampleGuid == "")
						objElt.removeAttribute("eltrdexampleguid");

					if (EltAttributeGuid == "")
						objElt.removeAttribute("eltattributeguid");

					if (EltAttributeType == "")
						objElt.removeAttribute("eltattributetype");

					if (EltCategoryGuid == "")
						objElt.removeAttribute("eltcategoryguid");

					if (EltMediaTypeName == "")
						objElt.removeAttribute("eltmediatypename");

					if (EltMediaTypeAttribute == "")
						objElt.removeAttribute("eltmediatypeattribute");

					if (EltRDDescription == "")
						objElt.removeAttribute("eltrddescription");

					if (EltSearchDepth == "")
						objElt.removeAttribute("eltsearchdepth");

					if (EltOnlyHrefValue == "")
						objElt.removeAttribute("eltonlyhrefvalue");

					if (EltRequired == "")
						objElt.removeAttribute("eltrequired");
						
					if (EltDeactivateTextFilter == "")
						objElt.removeAttribute("eltdeactivatetextfilter");

					if (EltKeywordSeparator == "")
						objElt.removeAttribute("eltkeywordseparator");

					if (EltUseSSL == "")
						objElt.removeAttribute("eltusessl");

					if (EltPicsAllLanguages == "")
						objElt.removeAttribute("eltpicsalllanguages");

					if (EltIgnoreWorkflow == "")
						objElt.removeAttribute("eltignoreworkflow");
						
					if (EltDoNotRemove == "")
						objElt.removeAttribute("eltdonotremove");

					if (EltLanguageIndependent == "")
						objElt.removeAttribute("eltlanguageindependent");

					if (EltInvisibleInClient == "")
						objElt.removeAttribute("eltinvisibleinclient");

					if (EltInvisibleInPage == "")
						objElt.removeAttribute("eltinvisibleinpage");

					if (EltProjectGuid == "")
						objElt.removeAttribute("eltprojectguid");

					if (EltTemplateGuid == "")
						objElt.removeAttribute("elttemplateguid");

					if (EltElementGuid == "")
						objElt.removeAttribute("eltelementguid");

					if (EltEditorialElement == "")
						objElt.removeAttribute("elteditorialelement");

					if (EltBeginMark == "")
						objElt.removeAttribute("eltbeginmark");

					if (EltEndMark == "")
						objElt.removeAttribute("eltendmark");

					if (EltUserDefinedAllowed == "")
						objElt.removeAttribute("eltuserdefinedallowed");

					if (EltDoNotHtmlEncode == "")
						objElt.removeAttribute("eltdonothtmlencode");

					if (EltMaxSize == "")
						objElt.removeAttribute("eltmaxsize");

					//LW 2002/07/17
					if (EltMaxPicWidth == "")
						objElt.removeAttribute("eltmaxpicwidth");

					if (EltMaxPicHeight == "")
						objElt.removeAttribute("eltmaxpicheight");

					if (EltFontClass == "")
						objElt.removeAttribute("eltfontclass");

					if (EltFontSize == "")
						objElt.removeAttribute("eltfontsize");

					if (EltFontColor == "")
						objElt.removeAttribute("eltfontcolor");

					if (EltFontFace == "")
						objElt.removeAttribute("eltfontface");

					if (EltWidth == "")
						objElt.removeAttribute("eltwidth");

					if (EltHeight == "")
						objElt.removeAttribute("eltheight");

					if (EltBorder == "")
						objElt.removeAttribute("eltborder");

					if (EltVSpace == "")
						objElt.removeAttribute("eltvspace");

					if (EltHSpace == "")
						objElt.removeAttribute("elthspace");

					if (EltAlign == "")
						objElt.removeAttribute("eltalign");

					if (EltUserMap == "")
						objElt.removeAttribute("eltusermap");

					if (EltSupplement == "")
						objElt.removeAttribute("eltsupplement");

					if (EltImageSupplement == "")
						objElt.removeAttribute("eltimagesupplement");

					if (EltPresetAlt == "")
						objElt.removeAttribute("eltpresetalt");

					if (EltAlt == "")
						objElt.removeAttribute("eltalt");

					if (EltSrc == "")
						objElt.removeAttribute("eltsrc");

					if (EltXslFile == "")
						objElt.removeAttribute("eltxslfile");

					if (EltShape == "")
						objElt.removeAttribute("eltshape");

					if (EltCoords == "")
						objElt.removeAttribute("eltcoords");

					if (EltTarget == "")
						objElt.removeAttribute("elttarget");

					if (EltSubType == "")
						objElt.removeAttribute("eltsubtype");

					if (EltFolderGuid == "")
						objElt.removeAttribute("eltfolderguid");

					if (EltConnectionGuid == "")
						objElt.removeAttribute("eltconnectionguid");

					if (EltProjectVariantGuid == "")
						objElt.removeAttribute("eltprojectvariantguid");

					if (EltLanguageVariantGuid == "")
						objElt.removeAttribute("eltlanguagevariantguid");

					if (EltLanguageVariantId == "")
						objElt.removeAttribute("eltlanguagevariantid");

					if (EltRelatedFolderGuid == "")
						objElt.removeAttribute("eltrelatedfolderguid");

					if (EltFontBold == "")
						objElt.removeAttribute("eltfontbold");

					if (EltHitType == "")
						objElt.removeAttribute("elthittype");

					if (EltIsTargetContainer == "")
						objElt.removeAttribute("eltistargetcontainer");

					if (EltIsDynamic == "")
						objElt.removeAttribute("eltisdynamic");

					if (EltHref == "")
						objElt.removeAttribute("elthref");

					if (EltValue == "")
						objElt.removeAttribute("eltvalue");

					if (EltDefaultSuffix == "")
						objElt.removeAttribute("eltdefaultsuffix");

					if (EltWholeText == "")
						objElt.removeAttribute("eltwholetext");

					if (EltFrameName == "")
						objElt.removeAttribute("eltframename");

					if (EltMarginWidth == "")
						objElt.removeAttribute("eltmarginwidth");

					if (EltMarginHeight == "")
						objElt.removeAttribute("eltmarginheight");

					if (EltScrolling == "")
						objElt.removeAttribute("eltscrolling");

					if (EltNoResize == "")
						objElt.removeAttribute("eltnoresize");

					if (EltFrameBorder == "")
						objElt.removeAttribute("eltframeborder");

					if (EltCrlfToBr == "")
						objElt.removeAttribute("eltcrlftobr");

					if (EltEditorOptions == "")
						objElt.removeAttribute("elteditoroptions");

					if (EltEditAlignLeft == "")
						objElt.removeAttribute("elteditalignleft");

					if (EltEditAlignCenter == "")
						objElt.removeAttribute("elteditaligncenter");

					if (EltEditAlignRight == "")
						objElt.removeAttribute("elteditalignright");

					if (EltEditFontBackColor == "")
						objElt.removeAttribute("elteditfontbackcolor");

					if (EltEditFontBold == "")
						objElt.removeAttribute("elteditfontbold");

					if (EltEditFontType == "")
						objElt.removeAttribute("elteditfonttype");

					if (EltEditFontForeColor == "")
						objElt.removeAttribute("elteditfontforecolor");

					if (EltEditFontItalic == "")
						objElt.removeAttribute("elteditfontitalic");

					if (EltEditFontSize == "")
						objElt.removeAttribute("elteditfontsize");

					if (EltEditFontUnderline == "")
						objElt.removeAttribute("elteditfontunderline");

					if (EltEditInsertPicture == "")
						objElt.removeAttribute("elteditinsertpicture");

					if (EltEditDefineMarker == "")
						objElt.removeAttribute("elteditdefinemarker");

					if (EltEditInsertMarker == "")
						objElt.removeAttribute("elteditinsertmarker");

					if (EltEditInsertLink == "")
						objElt.removeAttribute("elteditinsertlink");

					if (EltEditInsertTab == "")
						objElt.removeAttribute("elteditinserttab");

					if (EltEditInsertTable == "")
						objElt.removeAttribute("elteditinserttable");

					if (EltEditInsertList == "")
						objElt.removeAttribute("elteditinsertlist");

					if (EltEditInsertNumb == "")
						objElt.removeAttribute("elteditinsertnumb");

					if (EltEditClearTab == "")
						objElt.removeAttribute("elteditcleartab");

					if (EltEditSubscript == "")
						objElt.removeAttribute("elteditsubscript");

					if (EltEditSuperscript == "")
						objElt.removeAttribute("elteditsuperscript");

					if (EltConvertMode == "")
						objElt.removeAttribute("eltconvertmode");

					if (EltCompression == "")
						objElt.removeAttribute("eltcompression");

					if (EltOnlyNonWebSources == "")
						objElt.removeAttribute("eltonlynonwebsources");

					if (EltTargetFormat == "")
						objElt.removeAttribute("elttargetformat");

					if (EltConvert == "")
						objElt.removeAttribute("eltconvert");

					if (EltOrientation == "")
						objElt.removeAttribute("eltorientation");

					if (EltSuffixes == "")
						objElt.removeAttribute("eltsuffixes");

					if (EltIsRefField == "")
						objElt.removeAttribute("eltisreffield");

					if (EltListType == "")
						objElt.removeAttribute("eltlisttype");

					if (EltOrderBy == "")
						objElt.removeAttribute("eltorderby");

					if (EltIsListEntry == "")
						objElt.removeAttribute("eltislistentry");

					if (EltLinksInText == "")
						objElt.removeAttribute("eltlinksintext");

					if (EltIsSupplement == "")
						objElt.removeAttribute("eltissupplement");

					if (EltDatabaseName == "")
						objElt.removeAttribute("eltdatabasename");

					if (EltTableName == "")
						objElt.removeAttribute("elttablename");

					if (EltColumnName == "")
						objElt.removeAttribute("eltcolumnname");

					if (EltBinColumnName == "")
						objElt.removeAttribute("eltbincolumnname");

					if (EltColumnType == "")
						objElt.removeAttribute("eltcolumntype");

					if (EltColumnIOType == "")
						objElt.removeAttribute("eltcolumniotype");

					if (EltDefaultInfo == "")
						objElt.removeAttribute("eltdefaultinfo");

					if (EltFormatButton == "")
						objElt.removeAttribute("eltformatbutton");

					if (EltFormatNo == "")
						objElt.removeAttribute("eltformatno");

					if (EltFormat == "")
						objElt.removeAttribute("eltformat");

					if (EltLcId == "")
						objElt.removeAttribute("eltlcid");

					if (EltFormatting == "")
						objElt.removeAttribute("eltformatting");

					if (EltDirection == "")
						objElt.removeAttribute("eltdirection");

					if (EltNextPageType == "")
						objElt.removeAttribute("eltnextpagetype");

					if (EltDefaultTextGuid == "")
						objElt.removeAttribute("eltdefaulttextguid");

					if (EltDefaultText == "")
						objElt.removeAttribute("eltdefaulttext");

					if (EltOptionListData == "")
						objElt.removeAttribute("eltoptionlistdata");

					if (EltFieldType == "")
						objElt.removeAttribute("eltfieldtype");

					if (EltParentElementGUID == "")
						objElt.removeAttribute("eltparentelementguid");

					if (EltParentElementName == "")
						objElt.removeAttribute("eltparentelementname");

					if (EltExtendedList == "")
						objElt.removeAttribute("eltextendedlist");
				}
		}

	function SetAttributes(objElt)//Attribute setzen
		{
			objElt.elttype=EltType;
			objElt.eltevalcalledpage=EltEvalCalledPage;
			objElt.eltusemainlink=EltUseMainLink;
			objElt.eltdefaultvalue=EltDefaultValue;
			objElt.eltcategorytype=EltCategoryType;
			objElt.eltrefelementguid=EltRefElementGuid;
			objElt.eltdepth=EltDepth;
			objElt.eltdropouts=EltDropOuts;
			objElt.elttableopen=EltTableOpen;
			objElt.elttableclose=EltTableClose;
			objElt.eltrowopen=EltRowOpen;
			objElt.eltrowclose=EltRowClose;
			objElt.eltcolopen=EltColOpen;
			objElt.eltcolclose=EltColClose;						
			objElt.eltrdexample=EltRDExample;
			objElt.eltrdexampleguid=EltRDExampleGuid;
			objElt.eltattributeguid=EltAttributeGuid;			
			objElt.eltattributetype=EltAttributeType;			
			objElt.eltcategoryguid=EltCategoryGuid;									
			objElt.eltmediatypename=EltMediaTypeName;
			objElt.eltmediatypeattribute=EltMediaTypeAttribute;						
			objElt.eltrddescription=EltRDDescription;
			objElt.eltsearchdepth=EltSearchDepth;
			objElt.eltonlyhrefvalue=EltOnlyHrefValue;
			objElt.eltrequired=EltRequired;
			objElt.eltdeactivatetextfilter=EltDeactivateTextFilter;
			objElt.eltkeywordseparator=EltKeywordSeparator;									
			objElt.eltusessl=EltUseSSL;
			objElt.eltpicsalllanguages=EltPicsAllLanguages;			
			objElt.eltignoreworkflow=EltIgnoreWorkflow;
			objElt.eltdonotremove=EltDoNotRemove;
			objElt.eltlanguageindependent=EltLanguageIndependent;			
			objElt.eltinvisibleinclient=EltInvisibleInClient;
			objElt.eltinvisibleinpage=EltInvisibleInPage;			
			objElt.eltprojectguid=EltProjectGuid;
			objElt.elttemplateguid=EltTemplateGuid;
			objElt.eltelementguid=EltElementGuid;									
			objElt.elteditorialelement=EltEditorialElement;
			objElt.eltbeginmark=EltBeginMark;
			objElt.eltendmark=EltEndMark;
			objElt.eltuserdefinedallowed=EltUserDefinedAllowed;
			objElt.eltdonothtmlencode=EltDoNotHtmlEncode;
			objElt.eltmaxsize=EltMaxSize;

			//LW 2002/07/17
			objElt.eltmaxpicwidth=EltMaxPicWidth;
			objElt.eltmaxpicheight=EltMaxPicHeight;

			objElt.eltfontclass=EltFontClass;
			objElt.eltfontsize=EltFontSize;
			objElt.eltfontcolor=EltFontColor;
			objElt.eltfontface=EltFontFace;
			objElt.eltwidth=EltWidth;
			objElt.eltheight=EltHeight;
			objElt.eltborder=EltBorder;
			objElt.eltvspace=EltVSpace;
			objElt.elthspace=EltHSpace;
			objElt.eltalign=EltAlign;
			objElt.eltusermap=EltUserMap;
			objElt.eltsupplement=EltSupplement;
			objElt.eltimagesupplement=EltImageSupplement;
			objElt.eltpresetalt=EltPresetAlt;
			objElt.eltalt=EltAlt;
			objElt.eltsrc=EltSrc;
			objElt.eltxslfile=EltXslFile;
			objElt.eltshape=EltShape;
			objElt.eltcoords=EltCoords;
			objElt.elttarget=EltTarget;
			objElt.eltfolderguid=EltFolderGuid;			
			objElt.eltconnectionguid=EltConnectionGuid;
			objElt.eltprojectvariantguid=EltProjectVariantGuid;
			objElt.eltlanguagevariantguid=EltLanguageVariantGuid;
			objElt.eltlanguagevariantid=EltLanguageVariantId;
			objElt.eltrelatedfolderguid=EltRelatedFolderGuid;
			objElt.eltsubtype=EltSubType;
			objElt.eltfontbold=EltFontBold;
			objElt.elthittype=EltHitType;
			objElt.eltistargetcontainer=EltIsTargetContainer;
			objElt.eltisdynamic=EltIsDynamic;
			objElt.elthref=EltHref;
			objElt.eltvalue=EltValue;
			objElt.eltwholetext=EltWholeText;
			objElt.eltframename=EltFrameName;
			objElt.eltmarginwidth=EltMarginWidth;
			objElt.eltmarginheight=EltMarginHeight;
			objElt.eltscrolling=EltScrolling;
			objElt.eltnoresize=EltNoResize;
			objElt.eltframeborder=EltFrameBorder;
			objElt.eltcrlftobr=EltCrlfToBr;
			objElt.elteditoroptions=EltEditorOptions;
			objElt.elteditalignleft=EltEditAlignLeft;
			objElt.elteditaligncenter=EltEditAlignCenter;
			objElt.elteditalignright=EltEditAlignRight;
			objElt.elteditfontbackcolor=EltEditFontBackColor;
			objElt.elteditfontbold=EltEditFontBold;
			objElt.elteditfonttype=EltEditFontType;
			objElt.elteditfontforecolor=EltEditFontForeColor;
			objElt.elteditfontitalic=EltEditFontItalic;
			objElt.elteditfontsize=EltEditFontSize;
			objElt.elteditfontunderline=EltEditFontUnderline;
			objElt.elteditinsertpicture=EltEditInsertPicture;
			objElt.elteditdefinemarker=EltEditDefineMarker;
			objElt.elteditinsertmarker=EltEditInsertMarker;
			objElt.elteditinsertlink=EltEditInsertLink;
			objElt.elteditinserttab=EltEditInsertTab;
			objElt.elteditinserttable=EltEditInsertTable;
			objElt.elteditinsertlist=EltEditInsertList;
			objElt.elteditinsertnumb=EltEditInsertNumb;
			objElt.elteditcleartab=EltEditClearTab;
			objElt.elteditsubscript=EltEditSubscript;
			objElt.elteditsuperscript=EltEditSuperscript;
			objElt.eltconvertmode=EltConvertMode;
			objElt.eltcompression=EltCompression;
			objElt.eltonlynonwebsources=EltOnlyNonWebSources;
			objElt.elttargetformat=EltTargetFormat;
			objElt.eltconvert=EltConvert;
			objElt.eltorientation=EltOrientation;
			objElt.eltsuffixes=EltSuffixes;
			objElt.eltisreffield=EltIsRefField;
			objElt.eltlisttype=EltListType;
			objElt.eltorderby=EltOrderBy;
			objElt.eltislistentry=EltIsListEntry;
			objElt.eltlinksintext=EltLinksInText;
			objElt.eltissupplement=EltIsSupplement;
			objElt.eltdatabasename=EltDatabaseName;
			objElt.elttablename=EltTableName;
			objElt.eltcolumnname=EltColumnName;
			objElt.eltbincolumnname=EltBinColumnName;
			objElt.eltcolumntype=EltColumnType;
			objElt.eltcolumniotype=EltColumnIOType;
			objElt.eltdefaultinfo=EltDefaultInfo;
			objElt.eltformatbutton=EltFormatButton;
			objElt.eltformatno=EltFormatNo;
			objElt.eltformat=EltFormat;
			objElt.eltlcid=EltLcId;
			objElt.eltformatting=EltFormatting;
			objElt.eltdirection=EltDirection;
			objElt.eltnextpagetype=EltNextPageType;
			objElt.eltdefaulttextguid=EltDefaultTextGuid;
			objElt.eltdefaulttext=EltDefaultText;
			objElt.eltoptionlistdata=EltOptionListData;
			objElt.eltfieldtype=EltFieldType;
			objElt.eltparentelementguid="";//EltParentElementGUID;//Immer loeschen!
			objElt.eltparentelementname=EltParentElementName;
			objElt.eltextendedlist=EltExtendedList;
			objElt.eltdefaultsuffix=EltDefaultSuffix;
		}

	function XmlEncodeAttribute(objDiv,sAttributeName)
		{
			if (sAttributeName=="eltoptionlistdata")
				{
					var sCheckBuffer=objDiv.getAttribute("eltoptionlistdata");
					
					if (sCheckBuffer!=null)
						{
							if (sCheckBuffer=="<SELECTIONS></SELECTIONS>" || sCheckBuffer=="&lt;SELECTIONS&gt;&lt;/SELECTIONS&gt;")
								{
									objDiv.setAttribute(sAttributeName,EmptyBuffer);
									return;	
								}
							
							if (sCheckBuffer.indexOf("&lt;SELECTIONS&gt;")==0 && sCheckBuffer.indexOf("%3CSELECTIONS%3E")==-1)
								{
									document.all("ConvertBuffer").innerHTML=sCheckBuffer;
									var sBuffer=document.all("ConvertBuffer").innerText;
									if (sBuffer!="")
										objDiv.setAttribute(sAttributeName,escape(sBuffer));
									else
										objDiv.setAttribute(sAttributeName,"");
								}
							else if (sCheckBuffer.indexOf("<SELECTIONS>")==-1 && sCheckBuffer.indexOf("%3CSELECTIONS%3E")==-1)
								{
									document.all("ConvertBuffer").innerText=sCheckBuffer;
									var sBuffer=document.all("ConvertBuffer").innerHTML;
									if (sBuffer!="")
										objDiv.setAttribute(sAttributeName,escape(sBuffer));
									else
										objDiv.setAttribute(sAttributeName,"");
								}
							else if(sCheckBuffer!="" && sCheckBuffer.indexOf("%3CSELECTIONS%3E")==-1)
								{
									objDiv.setAttribute(sAttributeName,escape(sCheckBuffer));
								}
						}
				}
			else
				{
					if (sAttributeName=="eltstylesheetdata")
						{
							objDiv.removeAttribute(sAttributeName);
						}
					else
						{
							var sValue=objDiv.getAttribute(sAttributeName);

							if (sValue != null && sValue != "")
								{
									objDiv.setAttribute(sAttributeName,XmlEncode(sValue));
								}
						}
				}
		}

	function XmlEncode(sValue)
		{
			var sNewValue=sValue;

			//if (sValue.indexOf('&amp;')==-1)
				//sNewValue=sNewValue.replace(/&/g,"&amp;");

			sNewValue=sNewValue.replace(/"/g,"&quot;");
			sNewValue=sNewValue.replace(/>/g,"&gt;");
			sNewValue=sNewValue.replace(/</g,"&lt;");

			return sNewValue;
		}

	function XmlDecode(sValue)
	{
		var sNewValue=sValue.replace(/&lt;/g,"<");

		sNewValue=sNewValue.replace(/&gt;/g,">");
		sNewValue=sNewValue.replace(/&quot;/g,'"');
		sNewValue=sNewValue.replace(/&amp;/g,"&");

		return sNewValue;
	}

	function XmlDecodeAttribute(objDiv,sAttributeName)
		{
			var sValue=objDiv.getAttribute(sAttributeName);

			if (sValue != null && sValue != "")
				{
					objDiv.setAttribute(sAttributeName,XmlDecode(sValue));
				}
		}

	function SaveTempData()
		{
			ioWatchdog.SaveTempData();
		}

	function XmlDecodeEltData()
		{
			if (objEditorDoc != null)
				{
					if (objEditorDoc.body != null)
						{
							var objDiv=ioEltTypesData.document.all.tags("DIV");

							for (var i=0; i<objDiv.length; i++)
								{
									XmlDecodeAttribute(objDiv(i),"elttype");
									XmlDecodeAttribute(objDiv(i),"eltevalcalledpage");
									XmlDecodeAttribute(objDiv(i),"eltusemainlink");
									XmlDecodeAttribute(objDiv(i),"eltdefaultvalue");
									XmlDecodeAttribute(objDiv(i),"eltcategorytype");									
									XmlDecodeAttribute(objDiv(i),"eltrefelementguid");									
									XmlDecodeAttribute(objDiv(i),"eltdepth");									
									XmlDecodeAttribute(objDiv(i),"eltdropouts");									
									XmlDecodeAttribute(objDiv(i),"elttableopen");
									XmlDecodeAttribute(objDiv(i),"elttableclose");
									XmlDecodeAttribute(objDiv(i),"eltrowopen");
									XmlDecodeAttribute(objDiv(i),"eltrowclose");
									XmlDecodeAttribute(objDiv(i),"eltcolopen");
									XmlDecodeAttribute(objDiv(i),"eltcolclose");																		
									XmlDecodeAttribute(objDiv(i),"eltrdexample");
									XmlDecodeAttribute(objDiv(i),"eltrdexampleguid");									
									XmlDecodeAttribute(objDiv(i),"eltattributeguid");																		
									XmlDecodeAttribute(objDiv(i),"eltattributetype");																																													
									XmlDecodeAttribute(objDiv(i),"eltcategoryguid");																											
									XmlDecodeAttribute(objDiv(i),"eltmediatypename");
									XmlDecodeAttribute(objDiv(i),"eltmediatypeattribute");																		
									XmlDecodeAttribute(objDiv(i),"eltrddescription");
									XmlDecodeAttribute(objDiv(i),"eltsearchdepth");
									XmlDecodeAttribute(objDiv(i),"eltonlyhrefvalue");
									XmlDecodeAttribute(objDiv(i),"eltpicsalllanguages");									
									XmlDecodeAttribute(objDiv(i),"eltignoreworkflow");
									XmlDecodeAttribute(objDiv(i),"eltdonotremove");
									XmlDecodeAttribute(objDiv(i),"eltlanguageindependent");																		
									XmlDecodeAttribute(objDiv(i),"eltinvisibleinclient");
									XmlDecodeAttribute(objDiv(i),"eltinvisibleinpage");																		
									XmlDecodeAttribute(objDiv(i),"eltprojectguid");
									XmlDecodeAttribute(objDiv(i),"elttemplateguid");
									XmlDecodeAttribute(objDiv(i),"eltelementguid");																											
									XmlDecodeAttribute(objDiv(i),"elteditorialelement");
									XmlDecodeAttribute(objDiv(i),"eltbeginmark");
									XmlDecodeAttribute(objDiv(i),"eltendmark");
									XmlDecodeAttribute(objDiv(i),"eltuserdefinedallowed");
									XmlDecodeAttribute(objDiv(i),"eltdonothtmlencode");
									XmlDecodeAttribute(objDiv(i),"eltmaxsize");

									//LW 2002/07/17
									XmlDecodeAttribute(objDiv(i),"eltmaxpicwidth");
									XmlDecodeAttribute(objDiv(i),"eltmaxpicheight");

									XmlDecodeAttribute(objDiv(i),"eltfontclass");
									XmlDecodeAttribute(objDiv(i),"eltfontsize");
									XmlDecodeAttribute(objDiv(i),"eltfontcolor");
									XmlDecodeAttribute(objDiv(i),"eltfontface");
									XmlDecodeAttribute(objDiv(i),"eltwidth");
									XmlDecodeAttribute(objDiv(i),"eltheight");
									XmlDecodeAttribute(objDiv(i),"eltborder");
									XmlDecodeAttribute(objDiv(i),"eltvspace");
									XmlDecodeAttribute(objDiv(i),"elthspace");
									XmlDecodeAttribute(objDiv(i),"eltalign");
									XmlDecodeAttribute(objDiv(i),"eltusermap");
									XmlDecodeAttribute(objDiv(i),"eltsupplement");
									XmlDecodeAttribute(objDiv(i),"eltimagesupplement");
									XmlDecodeAttribute(objDiv(i),"eltpresetalt");
									XmlDecodeAttribute(objDiv(i),"eltalt");
									XmlDecodeAttribute(objDiv(i),"eltsrc");
									XmlDecodeAttribute(objDiv(i),"eltxslfile");
									XmlDecodeAttribute(objDiv(i),"eltshape");
									XmlDecodeAttribute(objDiv(i),"eltcoords");
									XmlDecodeAttribute(objDiv(i),"elttarget");
									XmlDecodeAttribute(objDiv(i),"eltfolderguid");									
									XmlDecodeAttribute(objDiv(i),"eltconnectionguid");
									XmlDecodeAttribute(objDiv(i),"eltprojectvariantguid");
									XmlDecodeAttribute(objDiv(i),"eltlanguagevariantguid");
									XmlDecodeAttribute(objDiv(i),"eltlanguagevariantid");
									XmlDecodeAttribute(objDiv(i),"eltrelatedfolderguid");
									XmlDecodeAttribute(objDiv(i),"eltsubtype");
									XmlDecodeAttribute(objDiv(i),"eltfontbold");
									XmlDecodeAttribute(objDiv(i),"elthittype");
									XmlDecodeAttribute(objDiv(i),"eltistargetcontainer");
									XmlDecodeAttribute(objDiv(i),"eltisdynamic");
									XmlDecodeAttribute(objDiv(i),"elthref");
									XmlDecodeAttribute(objDiv(i),"eltvalue");
									XmlDecodeAttribute(objDiv(i),"eltdefaultsuffix");
									XmlDecodeAttribute(objDiv(i),"wholetext");
									XmlDecodeAttribute(objDiv(i),"eltframename");
									XmlDecodeAttribute(objDiv(i),"eltmarginwidth");
									XmlDecodeAttribute(objDiv(i),"eltmarginheight");
									XmlDecodeAttribute(objDiv(i),"eltscrolling");
									XmlDecodeAttribute(objDiv(i),"eltnoresize");
									XmlDecodeAttribute(objDiv(i),"eltframeborder");
									XmlDecodeAttribute(objDiv(i),"eltcrlftobr");
									XmlDecodeAttribute(objDiv(i),"elteditoroptions");
									XmlDecodeAttribute(objDiv(i),"elteditalignleft");
									XmlDecodeAttribute(objDiv(i),"elteditaligncenter");
									XmlDecodeAttribute(objDiv(i),"elteditalignright");
									XmlDecodeAttribute(objDiv(i),"elteditfontbackcolor");
									XmlDecodeAttribute(objDiv(i),"elteditfontbold");
									XmlDecodeAttribute(objDiv(i),"elteditfonttype");
									XmlDecodeAttribute(objDiv(i),"elteditfontforecolor");
									XmlDecodeAttribute(objDiv(i),"elteditfontitalic");
									XmlDecodeAttribute(objDiv(i),"elteditfontsize");
									XmlDecodeAttribute(objDiv(i),"elteditfontunderline");
									XmlDecodeAttribute(objDiv(i),"elteditinsertpicture");
									XmlDecodeAttribute(objDiv(i),"elteditdefinemarker");
									XmlDecodeAttribute(objDiv(i),"elteditinsertmarker");
									XmlDecodeAttribute(objDiv(i),"elteditinsertlink");
									XmlDecodeAttribute(objDiv(i),"elteditinserttab");
									XmlDecodeAttribute(objDiv(i),"elteditinserttable");
									XmlDecodeAttribute(objDiv(i),"elteditinsertlist");
									XmlDecodeAttribute(objDiv(i),"elteditinsertnumb");
									XmlDecodeAttribute(objDiv(i),"elteditcleartab");
									XmlDecodeAttribute(objDiv(i),"elteditsubscript");
									XmlDecodeAttribute(objDiv(i),"elteditsuperscript");
									XmlDecodeAttribute(objDiv(i),"eltconvertmode");
									XmlDecodeAttribute(objDiv(i),"eltcompression");
									XmlDecodeAttribute(objDiv(i),"eltonlynonwebsources");
									XmlDecodeAttribute(objDiv(i),"elttargetformat");
									XmlDecodeAttribute(objDiv(i),"eltconvert");
									XmlDecodeAttribute(objDiv(i),"eltorientation");
									XmlDecodeAttribute(objDiv(i),"eltsuffixes");
									XmlDecodeAttribute(objDiv(i),"eltisreffield");
									XmlDecodeAttribute(objDiv(i),"eltlisttype");
									XmlDecodeAttribute(objDiv(i),"eltorderby");
									XmlDecodeAttribute(objDiv(i),"eltislistentry");
									XmlDecodeAttribute(objDiv(i),"eltlinksintext");
									XmlDecodeAttribute(objDiv(i),"eltissupplement");
									XmlDecodeAttribute(objDiv(i),"eltdatabasename");
									XmlDecodeAttribute(objDiv(i),"elttablename");
									XmlDecodeAttribute(objDiv(i),"eltcolumnname");
									XmlDecodeAttribute(objDiv(i),"eltbincolumnname");
									XmlDecodeAttribute(objDiv(i),"eltcolumntype");
									XmlDecodeAttribute(objDiv(i),"eltcolumniotype");
									XmlDecodeAttribute(objDiv(i),"eltdefaultinfo");
									XmlDecodeAttribute(objDiv(i),"eltformatbutton");
									XmlDecodeAttribute(objDiv(i),"eltformatno");
									XmlDecodeAttribute(objDiv(i),"eltformat");
									XmlDecodeAttribute(objDiv(i),"eltlcid");
									XmlDecodeAttribute(objDiv(i),"eltformatting");
									XmlDecodeAttribute(objDiv(i),"eltdirection");
									XmlDecodeAttribute(objDiv(i),"eltnextpagetype");
									XmlDecodeAttribute(objDiv(i),"eltdefaulttextguid");
									XmlDecodeAttribute(objDiv(i),"eltdefaulttext");
									//XmlDecodeAttribute(objDiv(i),"eltoptionlistdata");
									XmlDecodeAttribute(objDiv(i),"eltfieldtype");
									XmlDecodeAttribute(objDiv(i),"eltparentelementguid");
									XmlDecodeAttribute(objDiv(i),"eltparentelementname");
									XmlDecodeAttribute(objDiv(i),"eltextendedlist");
								}
						}
				}
		}

	function TabPlus()
		{
			objRange=objEditorDoc.selection.createRange();
 			objRange.text="    " + objRange.text;
 			SetFocus();
		}

	function TabMinus()
		{
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

	function AutoSearchReplace(sOldValue,sNewValue)
		{
			var sSearchText=sOldValue;
			var sReplaceText=sNewValue;
			var oRange=null;
			var sBookMark=null;
			var sLastBookMark=null;
			var fExit=false;
			var iSelection=0;
			oRange = objEditorDoc.body.createTextRange();
			var iLength=oRange.text.length;

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
									oRange.text=sReplaceText;

									oRange.moveStart("Character",1);
									oRange.moveEnd("Character",iLength);
								}
							sLastBookMark=sBookMark;
						}
					else
						fExit=true;
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
					alert(ConvertToAscii(sLngId2476));
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
						alert(ConvertToAscii(sLngId2475));
				}
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
					alert(ConvertToAscii(sLngId2476));
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
						alert(ConvertToAscii(sLngId2475));
				}
		}

	function SetSearchText()
		{
			var objRange=objEditorDoc.selection.createRange();
			var sText=objRange.text;

			if (sText.length>0)
				document.Editor.txtSearch.value=sText;

		}

	function AddToUndoBuffer()
		{
			var sBufferCode=objEditorDoc.body.innerText;
			var sBufferData=ioEltTypesData.document.body.innerHTML;

			if (iUndoCounter==-1)
				{
					iUndoCounter++;
					UndoTemplateSourceCodeArray[iUndoCounter]=sBufferCode;
					UndoTemplateElementCodeArray[iUndoCounter]=sBufferData;
				}
			else if (sBufferCode!=UndoTemplateSourceCodeArray[iUndoCounter-1] || sBufferCode!=UndoTemplateElementCodeArray[iUndoCounter-1])
				{
					fTemplateChanged=true;
					if (iUndoCounter<iMaxUndoCount)
						{
							iUndoCounter++;
							UndoTemplateSourceCodeArray[iUndoCounter]=sBufferCode;
							UndoTemplateElementCodeArray[iUndoCounter]=sBufferData;
						}
					else
						{						
							for (var i=0;i<iMaxUndoCount;i++)
								{
									UndoTemplateSourceCodeArray[i]=UndoTemplateSourceCodeArray[i+1];
									UndoTemplateElementCodeArray[i]=UndoTemplateElementCodeArray[i+1];
								}
							UndoTemplateSourceCodeArray[iMaxUndoCount]=sBufferCode;
							UndoTemplateElementCodeArray[iMaxUndoCount]=sBufferData;
						}
				}
		}

	function Undo()
		{
			document.all("btUndo").disabled=true;
			if (String(UndoTemplateSourceCodeArray[iUndoCounter+1])=="undefined")
				{
					UndoTemplateSourceCodeArray[iUndoCounter+1]=objEditorDoc.body.innerText;
					UndoTemplateElementCodeArray[iUndoCounter+1]=ioEltTypesData.document.body.innerHTML;
				}

			if (iUndoCounter>0)
				{
					if (String(UndoTemplateSourceCodeArray[iUndoCounter-1])!="undefined")
						{
							iUndoCounter--;
							objEditorDoc.body.innerText=UndoTemplateSourceCodeArray[iUndoCounter];
							ioEltTypesData.document.body.innerHTML=UndoTemplateElementCodeArray[iUndoCounter];
							RescanAllVariables();
						}
				}
			else
				{
					objEditorDoc.body.innerText=UndoTemplateSourceCodeArray[0];
					ioEltTypesData.document.body.innerHTML=UndoTemplateElementCodeArray[0];
					RescanAllVariables();
				}

			document.all("btUndo").disabled=false;
			SetFocus();
		}

	function Redo()
		{
			document.all("btRedo").disabled=true;

			if (UndoTemplateSourceCodeArray.length>iUndoCounter)
				{
					if (UndoTemplateSourceCodeArray.length>(iUndoCounter+1) && iUndoCounter<iMaxUndoCount)
						{
							iUndoCounter++;
							objEditorDoc.body.innerText=UndoTemplateSourceCodeArray[iUndoCounter];
							ioEltTypesData.document.body.innerHTML=UndoTemplateElementCodeArray[iUndoCounter];
							RescanAllVariables();
						}
				}

			document.all("btRedo").disabled=false;
			SetFocus();
		}

	function DeletePlaceHolder()
		{
			var objRange=objEditorDoc.selection.createRange();
			var objParentElt=objRange.parentElement();

			if(String(objParentElt.vartype) != "undefined")
				{
					objParentElt.outerHTML="";
					objRange.moveStart("character",-1);
					objRange.moveEnd("character",1);
					objRange.select();
					objRange.text="";
				}

			AddToUndoBuffer();
			SetFocus();
		}

	function CheckSyntax()
		{
			var sBuffer=objEditorDoc.body.innerText;
			var iPosStart=sBuffer.indexOf("<");
			var iPosEnd=0;
			var iLtCounter=1;
			var iGtCounter=1;
			var fExit=false;

			if (iPosStart!=-1)
				{
					while (!fExit)
						{
							sBuffer=sBuffer.slice(iPosStart+1);
							iPosEnd=sBuffer.indexOf("<");
							if (iPosEnd == -1)
								fExit=true;
							else
								{
									iPosStart=iPosEnd;
									iLtCounter++;
								}
						}
				}

			fExit=false;
			sBuffer=objEditorDoc.body.innerText;
			iPosStart=sBuffer.indexOf(">");

			if (iPosStart!=-1)
				{
					while (!fExit)
						{
							sBuffer=sBuffer.slice(iPosStart+1);
							iPosEnd=sBuffer.indexOf(">");
							if (iPosEnd == -1)
								fExit=true;
							else
								{
									iPosStart=iPosEnd;
									iGtCounter++;
								}
						}
				}

			//LW 8.10.2001
			if (iLtCounter!=iGtCounter)
				{
					alert(ConvertToAscii(sLngId3379));
					return false;
				}
			else
				return true;
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

	function SelectCISEntry(sName,sKey)
		{
			document.all("cmbCISEntries").selectedIndex=0;
			SetFocus();

			if (sKey=="")
				return;

			var sAttributeList=String(window.showModalDialog('ioDialogCISXml.asp?DynamentKey=' + sKey,0,"dialogWidth:650px;dialogHeight:550px"));

			if (sAttributeList=="undefined")
				return;

			var objRange=objEditorDoc.selection.createRange();
			if (sAttributeList.indexOf(">")>-1)
				objRange.text="<" + sName + sAttributeList + "</" + sName + ">";
			else
				objRange.text="<" + sName + sAttributeList + "/>";

			AddToUndoBuffer();
			RescanAllVariables();
		}

	function SelectCISBlockEntry(sName,sKey)
		{
			document.all("cmbCISBlockEntries").selectedIndex=0;
			SetFocus();

			if (sKey=="")
				return;

			var objRange=objEditorDoc.selection.createRange();
			var sText=objRange.text;

			if (sText == "")
				alert(ConvertToAscii(sLngId1074));
			else
				{
					var sAttributeList=String(window.showModalDialog('ioDialogCISXml.asp?DynamentKey=' + sKey,0,"dialogWidth:650px;dialogHeight:550px"));

					if (sAttributeList=="undefined")
						return;

					objRange.text="<" + sName + sAttributeList + ">" + sText + "</" + sName + ">";
				}

			AddToUndoBuffer();
			RescanAllVariables();
		}

	function SwitchTemplateVariant()
		{
			var objTemplateVariant = document.forms.Editor.cmbTemplateVariant;

			if (objTemplateVariant.options.value==document.forms.Editor.CurrentTemplateVariant.value)
				return;

			var iSelection=7;//Change variant without saving

			if (fTemplateChanged)
				iSelection=AskForSavingTemplate();

			if (iSelection==2)//Cancel
				{
					objTemplateVariant.options.value=document.forms.Editor.CurrentTemplateVariant.value;
					return;
				}

			document.forms.Editor.TemplateVariant.value = objTemplateVariant.options[objTemplateVariant.selectedIndex].value;

			if (iSelection==6)//Save changes and change variant
				Save();
			else
				{
					document.forms.Editor.DoNotSave.value="1";
					objEditorDoc.body.innerText="";
					document.Editor.submit();
				}
		}

	function ColorizeCISTags()
		{
			var sValue=objEditorDoc.body.innerHTML;
			var RegArray=new Array("/&lt;rde-dm:[ A-Za-z0-9_#;:\"=\\[\\]\-]*\\/&gt;/g","/&lt;rde-dm:[ A-Za-z0-9_#;:\"=\\[\\]\-]*&gt;/g","/&lt;\\/rde-dm:[ A-Za-z0-9_#;:\"=\\[\\]\-]*&gt;/g");
			//var RegArray=new Array("/&lt;rde-dm:[ A-Za-z0-9_#;:\"=\\[\\]]*\\/&gt;/g","/&lt;rde-dm:[ A-Za-z0-9_#;:\"=\\[\\]]*&gt;/g","/&lt;\\/rde-dm:[ A-Za-z0-9_#;:\"=\\[\\]]*&gt;/g");

			for (var i=0;i<3;i++)
				{
					var oRegExp=eval(RegArray[i]);
					var oResult=sValue.match(oRegExp);
					
					if (oResult)			
						for (var i2=0; i2<oResult.length; i2++)							
							sValue=sValue.replace(oResult[i2], "&lt;<FONT vartype='CIS' style='BACKGROUND-COLOR: " + cGray + "' color=" + cWhite + ">" + oResult[i2].slice(4,oResult[i2].length-4) + "</FONT>&gt;");

				}
				
			objEditorDoc.body.innerHTML=sValue;
		}

	function CheckCpsSyntax()
		{
			var fClosed=false;
			var iWidth=650; 
			var iHeight=560;
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
			objDialogWindow=window.open("","_blank",'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=' + iWidth + ',height=' + iHeight + ',screenX=' + iLeft + ',screenY=' + iTop + ',left=' + iLeft + ',top=' + iTop);
			
			var objDialogDoc=objDialogWindow.document;			
			objDialogDoc.open();			
			//Formdialog zusammenbauen und Templatequellcode abschicken
			objDialogDoc.write('<HTML><HEAD><META HTTP-EQUIV="Expires" CONTENT="-1"></HEAD><BODY><form name="ioForm" action="ioCheckCpsSyntax.asp" method="post"><INPUT type=hidden name="Action" value="CheckCpsSyntax"><INPUT type=hidden name="CpsData" value=""></FORM></BODY></HTML>');
			objDialogDoc.close();
			objDialogDoc.ioForm.CpsData.value=objEditorDoc.body.innerText;
			objDialogDoc.ioForm.submit();
			
		}
		
