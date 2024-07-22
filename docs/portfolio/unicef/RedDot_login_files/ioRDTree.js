	//Java Script-Code fuer ioRDTree.asp
	//Author: Joerg Trautmann
		
	var sScriptVersionTree="5.28";
	
	var fError=false;
		
	function KillError(Error,Url,Line)
		{	    		
	    fError=true;
	    return true;
		}
				
	window.onerror=KillError;
				
	var GuidArray= new Array();
	var IMGArray= new Array();
	var IMGTypeArray= new Array();
	
	var cRed="#ff0000";
	var cBlack="#000000";
	var cBlue="#0000ff";
	var cGreen="#008000";
	var cGray="#808080";
	var cWhite="#ffffff";
	
	var cStartGUID="00000000000000000000000000000001";

	var	iIntervalId=0;
	var	iIVID_CheckTreeData=0;
	var	iIVID_CheckLoadingState=0;

	var iTreeIndex=1;
	var iStartIndex=1;
	var iEltCount=0;
	var iLastId=0;
	var iStartCounter=0;
	var iFlags=0;
	var iGuidCollectionIndex=0;
	var iFadeOutCounter=100;
	var iImgArrayIndex=0;
	
	var fStarted=false;
	var fClosing=false;
	var fCancel=false;
	var fAlphaStyle=false;
	var fCheckTreeData=false;
	var fExpandGuidCollection=true;
	var fLoadActionMenu=false;
	var sAppVersion=String(objRedDotTop.clientInformation.appVersion);	
	var fIE5=(sAppVersion.indexOf("MSIE 5")>-1);
	var fIE5_5=(sAppVersion.indexOf("MSIE 5.5")>-1);
	var fIE6=(sAppVersion.indexOf("MSIE 6")>-1);

	var sGUID="";
	var sGUIDC34="";
	var sParentGuid="";
	var sSegmentDescent="";
	var sSegmentDescentC34="";
	var sSegmentId="0";
	var sLastSegmentId="0";
	var sSegmentImage="";
	var sSegmentImageType="";
	var sSegmentValue="";
	var sSegmentExpand="1";
	var sSegmentClose="0";
	var sSegmentParentGuid="";
	var sImage="";	
	var sSegmentInfo="";
	var sSegmentType="";
	var sSegmentTypeC34="";
	var sSegmentName="";
	var sCol1FontColor="#000000";
	var sCol2FontColor="#808080";
	var sCol1FontWeight="normal";
	var sCol2FontWeight="normal";
	var sCol1Value="";
	var sCol2Value="";
	var sIsLink="";
	var sActiveGUID="";
	var sActiveType="";
	var sActiveDescent="";
	var sActionMenuURL="";
	var sLastAction="";
	var sSaveTreeHtmlCode="";
	var sSaveSegmentId="";
	var sLastReloadActiveGUID="";
		
	var objDialogWindow=null;
	var objRedDotWindow=null;
	var objTreeElement=null;
	var objLoadingInfoDoc=null;
	var objLoadingInfo=null;
	var objSliderDoc=null;
	var objHeaderActionMenu=null;
	var objActionMenuDoc=null;
	var objHeaderClipboard=null;
	var objClipboard=null;	
	var objInfoLabelStyle=document.all("InfoLabel").style;
	
	var sReady=document.Tree.StatusReady.value;
	var sBusy=document.Tree.StatusBusy.value;
	var sClipboardCaption=document.Tree.ClipboardCaption.value;
	var sClipboardRefreshCaption=document.Tree.ClipboardRefreshCaption.value;
	var sMenuCaption=document.Tree.MenuCaption.value;
	var sClipboardSelectAll=document.Tree.ClipboardSelectAll.value;
	var sClipboardUnselectAll=document.Tree.ClipboardUnselectAll.value;
	var sClipboardDeleteSelectedEntries=document.Tree.ClipboardDeleteSelectedEntries.value;
	var sElementInfoCaption=document.Tree.ElementInfoCaption.value;
	var sAutoScrollCaption=document.Tree.AutoScrollCaption.value;
	var sAutoLoadPageGUID=document.Tree.AutoLoadPageGUID.value;	
	
	var fLoadingInfoLoaded=false;
	var fSliderLoaded=false;
	var fHeaderActionMenu=false;
	var fHeaderClipBoard=false;
	var fActionMenu=false;
	var fClipboard=false;
	var fAllFramesLoaded=false;
	var fAutoLoaded=false;
	var fWaitingForAutoLoadData=false;
	var fInfoLabelDisabled=false;//true;
	
		iIntervalId=window.setInterval("CheckAllFrames()",200);		

		function CheckScriptVersion()
			{
				if (document.all.ScriptVersionTree.value!=sScriptVersionTree)
					{
						alert("Old script version found. Please clear browser cache.");
						objRedDotTop.window.close();
					}			
			}
		
		function CheckKeyEvent()
			{		
				if (window.event.ctrlKey)//Baum reset ausloesen
					{						
						fWaitingForAutoLoadData=false;
						fExpandGuidCollection=false;
						fCheckTreeData=false;
						fWaitingForAutoLoadData=false;

						alert("Tree reset.");
						return false;
 					}	
			}

		function CheckCtrlKey()
			{
				if (String(window.event)!="undefined")
					{
						if (window.event.keyCode==78 && (!window.event.altKey && window.event.ctrlKey))//Ctrl+N abfangen
							return false;
					}
				return true;
			}

		function SetInfoLabelPosition()
			{							
				if (fInfoLabelDisabled) return;
				var objBody=objRedDotTop.frames.ioTree.document.body;
				var iWidth=objInfoLabelStyle.width;				
				iWidth=iWidth.replace("px","");
				var iHeight=objInfoLabelStyle.height;
				iHeight=iHeight.replace("px","");												
				var iX=(objBody.offsetWidth)/2-(iWidth/2)+objBody.scrollLeft;
				var iY=(objBody.offsetHeight)/2-(iHeight/2)+objBody.scrollTop;
				
				objInfoLabelStyle.left=iX;
				objInfoLabelStyle.right=iX;
				objInfoLabelStyle.top=iY;						
			}
													
		function ShowInfoLabel()
			{
				if (fInfoLabelDisabled) return;
				SetInfoLabelPosition();
				objInfoLabelStyle.display="";			
			}
			
		function HideInfoLabel()
			{
				if (fInfoLabelDisabled) return;
				objInfoLabelStyle.display="none";			
			}
					
		function FadeOutInfoLabel()
			{
				if (fInfoLabelDisabled) return;
				iFadeOutCounter=iFadeOutCounter - 10;
				if (iFadeOutCounter>0)
					{
						objInfoLabelStyle.filter="Alpha(opacity=" + iFadeOutCounter + ")";									
						window.setTimeout("FadeOutInfoLabel()",50);
					}
				else
					{
						iFadeOutCounter=100;						
						objInfoLabelStyle.display="none";		
						objInfoLabelStyle.filter="";
					}	
			}

		function CloseChildWindows()
			{
				if (objDialogWindow != null)
					if (!objDialogWindow.closed)
						objDialogWindow.close();

				if (objRedDotWindow != null)
					if (!objRedDotWindow.closed)
						objRedDotWindow.close();				
			}
		
		function CheckAllFrames()
			{
				var sReadyState="";
				
				if (String(objRedDotTop.frames.ioLoadingInfo) != "undefined" && !fLoadingInfoLoaded)
					{
						sReadyState="";
						try
							{
								sReadyState=objRedDotTop.frames.ioLoadingInfo.document.readyState;
							}
						catch (e) {}	
						
						if (sReadyState!="loading")
							{
								objLoadingInfoDoc=objRedDotTop.frames.ioLoadingInfo.document; 
								fLoadingInfoLoaded=true;
							}
					}	

				if (String(objRedDotTop.frames.ioSlider) != "undefined" && !fSliderLoaded)
					{
						sReadyState="";
						try
							{
								sReadyState=objRedDotTop.frames.ioSlider.document.readyState;
							}
						catch (e) {}	

						if (sReadyState!="loading")
							{
								objSliderDoc=objRedDotTop.frames.ioSlider.document; 
								fSliderLoaded=true;
							}
					}	
														 
				if (String(objRedDotTop.frames.ioHeaderActionMenu) != "undefined" && !fHeaderActionMenu)
					{
						sReadyState="";
						try
							{
								sReadyState=objRedDotTop.frames.ioHeaderActionMenu.document.readyState;
							}
						catch (e) {}	

						if (sReadyState!="loading")
							{
								objHeaderActionMenu=objRedDotTop.frames.ioHeaderActionMenu.document; 
								fHeaderActionMenu=true;
							}
					}	

				if (String(objRedDotTop.frames.ioActionMenu) != "undefined" && !fActionMenu)
					{
						sReadyState="";
						try
							{
								sReadyState=objRedDotTop.frames.ioActionMenu.document.readyState;
							}
						catch (e) {}	

						if (sReadyState!="loading")
							{
								objActionMenuDoc=objRedDotTop.frames.ioActionMenu.document;
								fActionMenu=true;
							}
					}	
				
				if (String(objRedDotTop.frames.ioHeaderClipBoard) != "undefined" && !fHeaderClipBoard)
					{
						sReadyState="";
						try
							{
								sReadyState=objRedDotTop.frames.ioHeaderClipBoard.document.readyState;
							}
						catch (e) {}	

						if (sReadyState!="loading")
							{
								objHeaderClipboard=objRedDotTop.frames.ioHeaderClipBoard.document; 
								fHeaderClipBoard=true;
							}
					}	
				 
				if (String(objRedDotTop.frames.ioClipboard) != "undefined" && !fClipboard)
					{
						sReadyState="";
						try
							{
								sReadyState=objRedDotTop.frames.ioClipboard.document.readyState;
							}
						catch (e) {}	

						if (sReadyState!="loading")
							{
								objClipboard=objRedDotTop.frames.ioClipboard.document; 		
								fClipboard=true;
							}
					}	

				if (fLoadingInfoLoaded && fSliderLoaded && fHeaderActionMenu && fActionMenu && fHeaderClipBoard && fClipboard)
					{			
						window.clearInterval(iIntervalId);												
						
						objLoadingInfoDoc.open();		
						
						if (sDialogTextDirection!="")
							objLoadingInfoDoc.write('<HTML dir="' + sDialogTextDirection + '"><BODY bgcolor=#808080 MARGINWIDTH="1" MARGINHEIGHT="0" LEFTMARGIN="5" RIGHTMARGIN="5" TOPMARGIN="1" BOTTOMMARGIN="1" xoncontextmenu="return false"><TABLE width="100%" cellpadding=0 cellspacing=0><TR><TD valign=top><FONT color=#ffffff face="Arial" size=2><A name="LoadingInfo">' + sReady + '</A><B>&nbsp;:Status</B></FONT></TD><TD valign=top align=left><INPUT style="margin-top:-5px" type=checkbox id=chkAutoScroll onclick="' + sRedDotTop + '.document.frames.ioTree.SaveAutoScrollSetting(this)"' + document.all("AutoScrollValue").value + '><FONT size=2 face=Arial color=#ffffff>&nbsp;' + sAutoScrollCaption + '&nbsp;</FONT></TD></TR></TABLE></BODY></HTML>');
						else
							objLoadingInfoDoc.write('<HTML><BODY bgcolor=#808080 MARGINWIDTH="1" MARGINHEIGHT="0" LEFTMARGIN="5" RIGHTMARGIN="1" TOPMARGIN="1" BOTTOMMARGIN="1" oncontextmenu="return false"><TABLE width="100%" cellpadding=0 cellspacing=0><TR><TD valign=top><FONT color=#ffffff face="Arial" size=2><B>Status:</B>&nbsp;<A name="LoadingInfo">' + sReady + '</A></FONT></TD><TD valign=top align=right><INPUT style="margin-top:-5px" type=checkbox id=chkAutoScroll onclick="' + sRedDotTop + '.document.frames.ioTree.SaveAutoScrollSetting(this)"' + document.all("AutoScrollValue").value + '><FONT size=2 face=Arial color=#ffffff>&nbsp;' + sAutoScrollCaption + '&nbsp;</FONT></TD></TR></TABLE></BODY></HTML>');
						
						objLoadingInfoDoc.close();
						objLoadingInfo=objLoadingInfoDoc.all.tags("A");

						objSliderDoc.open();
						
						if (sDialogTextDirection!="")
							objSliderDoc.write('<HTML><BODY bgcolor=#808080 oncontextmenu="return false"></BODY></HTML>');
						else
							objSliderDoc.write('<HTML dir="' + sDialogTextDirection + '"><BODY bgcolor=#808080 oncontextmenu="return false"></BODY></HTML>');
							
						objSliderDoc.close();
								
						objHeaderActionMenu.open();
						
						if (sDialogTextDirection!="")
							objHeaderActionMenu.write('<HTML dir="' + sDialogTextDirection + '"><HEAD><STYLE> A {text-decoration: none; font-family: Arial; font-size:11; vertical-align: middle} IMG {borderstyle: none; border: 0; height: 16px; vertical-align: middle} </STYLE></HEAD><BODY bgcolor=#808080 MARGINWIDTH="1" MARGINHEIGHT="0" LEFTMARGIN="0" RIGHTMARGIN="1" TOPMARGIN="0" BOTTOMMARGIN="1" oncontextmenu="return false"><table border="0" width="100%" bgcolor="#808080" cellspacing="0" cellpadding="0"><TR><TD width=250><FONT color=#ffffff face="Arial" size=2><B>&nbsp;' + sMenuCaption + '</B></FONT></TD><TD><A href="javascript:void(0)" onclick="ShowEltInfo();return(false)"><IMG width=16 height=16 border=0 src="Icons' + sDialogTextDirection + '/ElementInfo.gif" alt="' + sElementInfoCaption + '"></A><TD></TR></TABLE><A id="Banner"><table border="0" width="100%" bgcolor="#808080" cellspacing="0" cellpadding="0"><TR id=ioGUID valign=center><TD height=18 style="text-decoration: none; font-family: Arial; font-size:11;" width="100%" bgcolor="#ffffff"></TD></TR></TABLE></A></BODY></HTML><SCRIPT language=javascript>function CheckCursor(){} function ShowEltInfo(){' + sRedDotTop + '.frames.ioScrollInfo.ShowEltInfo()}</SCRIPT>');
						else
							objHeaderActionMenu.write('<HTML><HEAD><STYLE> A {text-decoration: none; font-family: Arial; font-size:11; vertical-align: middle} IMG {borderstyle: none; border: 0; height: 16px; vertical-align: middle} </STYLE></HEAD><BODY bgcolor=#808080 MARGINWIDTH="1" MARGINHEIGHT="0" LEFTMARGIN="0" RIGHTMARGIN="1" TOPMARGIN="0" BOTTOMMARGIN="1" oncontextmenu="return false"><table border="0" width="100%" bgcolor="#808080" cellspacing="0" cellpadding="0"><TR><TD width=250><FONT color=#ffffff face="Arial" size=2><B>&nbsp;' + sMenuCaption + '</B></FONT></TD><TD><A href="javascript:void(0)" onclick="ShowEltInfo();return(false)"><IMG width=16 height=16 border=0 src="Icons' + sDialogTextDirection + '/ElementInfo.gif" alt="' + sElementInfoCaption + '"></A><TD></TR></TABLE><A id="Banner"><table border="0" width="100%" bgcolor="#808080" cellspacing="0" cellpadding="0"><TR id=ioGUID valign=center><TD height=18 style="text-decoration: none; font-family: Arial; font-size:11;" width="100%" bgcolor="#ffffff"></TD></TR></TABLE></A></BODY></HTML><SCRIPT language=javascript>function CheckCursor(){} function ShowEltInfo(){' + sRedDotTop + '.frames.ioScrollInfo.ShowEltInfo()}</SCRIPT>');
							
						objHeaderActionMenu.close();

						objHeaderClipboard.open();
						
						if (sDialogTextDirection!="")
							objHeaderClipboard.write('<HTML dir="' + sDialogTextDirection + '"><BODY bgcolor=#808080 MARGINWIDTH="1" MARGINHEIGHT="0" LEFTMARGIN="5" RIGHTMARGIN="1" TOPMARGIN="1" BOTTOMMARGIN="1" oncontextmenu="return false"><TABLE cellspacing=0 cellpadding=0 width=100% border=0><TR><TD width=200><FONT color=#ffffff face="Arial" size=2><B>' + sClipboardCaption + '</B></FONT></TD><TD><A href="javascript:void(0)" onclick="' + sRedDotTop + '.document.frames.ioClipboard.RefreshClipboardData();return(false);"><IMG alt="' + sClipboardRefreshCaption + '" style="borderstyle:0; border:0" src="TreeIcons' + sDialogTextDirection + '/Reload16.gif" align="absmiddle"></A>&nbsp;&nbsp;<A href="javascript:void(0)" onclick="' + sRedDotTop + '.document.frames.ioClipboard.SelectAll();return(false);"><IMG alt="' + sClipboardSelectAll + '" style="borderstyle:0; border:0" src="TreeIcons' + sDialogTextDirection + '/ClipboardSelectAll.gif" align="absmiddle"></A>&nbsp;&nbsp;<A href="javascript:void(0)" onclick="' + sRedDotTop + '.document.frames.ioClipboard.UnselectAll();return(false);"><IMG alt="' + sClipboardUnselectAll + '" style="borderstyle:0; border:0" src="TreeIcons' + sDialogTextDirection + '/ClipboardUnselectAll.gif" align="absmiddle"></A>&nbsp;&nbsp;<A href="javascript:void(0)" onclick="' + sRedDotTop + '.document.frames.ioClipboard.DeleteCheckedEntries();return(false);"><IMG alt="' + sClipboardDeleteSelectedEntries + '" style="borderstyle:0; border:0" src="TreeIcons' + sDialogTextDirection + '/ClipboardDeleteSelected.gif" align="absmiddle"></A>&nbsp;</TD></TR></TABLE></BODY></HTML>');
						else
							objHeaderClipboard.write('<HTML><BODY bgcolor=#808080 MARGINWIDTH="1" MARGINHEIGHT="0" LEFTMARGIN="5" RIGHTMARGIN="1" TOPMARGIN="1" BOTTOMMARGIN="1" oncontextmenu="return false"><TABLE cellspacing=0 cellpadding=0 width=100% border=0><TR><TD width=200><FONT color=#ffffff face="Arial" size=2><B>' + sClipboardCaption + '</B></FONT></TD><TD><A href="javascript:void(0)" onclick="' + sRedDotTop + '.document.frames.ioClipboard.RefreshClipboardData();return(false);"><IMG alt="' + sClipboardRefreshCaption + '" style="borderstyle:0; border:0" src="TreeIcons' + sDialogTextDirection + '/Reload16.gif" align="absmiddle"></A>&nbsp;&nbsp;<A href="javascript:void(0)" onclick="' + sRedDotTop + '.document.frames.ioClipboard.SelectAll();return(false);"><IMG alt="' + sClipboardSelectAll + '" style="borderstyle:0; border:0" src="TreeIcons' + sDialogTextDirection + '/ClipboardSelectAll.gif" align="absmiddle"></A>&nbsp;&nbsp;<A href="javascript:void(0)" onclick="' + sRedDotTop + '.document.frames.ioClipboard.UnselectAll();return(false);"><IMG alt="' + sClipboardUnselectAll + '" style="borderstyle:0; border:0" src="TreeIcons' + sDialogTextDirection + '/ClipboardUnselectAll.gif" align="absmiddle"></A>&nbsp;&nbsp;<A href="javascript:void(0)" onclick="' + sRedDotTop + '.document.frames.ioClipboard.DeleteCheckedEntries();return(false);"><IMG alt="' + sClipboardDeleteSelectedEntries + '" style="borderstyle:0; border:0" src="TreeIcons' + sDialogTextDirection + '/ClipboardDeleteSelected.gif" align="absmiddle"></A>&nbsp;</TD></TR></TABLE></BODY></HTML>');
							
						objHeaderClipboard.close();				
									
						window.setInterval("CheckExpandGuidCollection()", 500);
						iIVID_CheckTreeData=window.setInterval("CheckTreeData()", 50);
						iIVID_CheckLoadingState=window.setInterval("CheckLoadingState()", 100);								
						//objClipboard.location.reload();
						objClipboard.location.href="ioRDClipboard.asp";
						if (!fIE5_5 && !fIE6)
							window.setTimeout("SetIndexOnStart()",1500);																					
					}
			}
		
		function SetIndexOnStart()
			{
				document.all("IMGTypeStart").click();				
			}	
			
		function CheckExpandGuidCollection()
			{
				if (fExpandGuidCollection && !fCheckTreeData)
					{
						if (iGuidCollectionIndex<GuidArray.length)
							{
								if (GuidArray[iGuidCollectionIndex] != "")
									{										
										SetTreeIndexToGUID(GuidArray[iGuidCollectionIndex]);
									}
								iGuidCollectionIndex++;					
							}
						else
							{
								fExpandGuidCollection=false;
							}
					}		
			}
				
		function CheckLoadingState()
			{																					
				var sActionMenuReadyState="";
				try
					{
						sActionMenuReadyState=objRedDotTop.frames.ioActionMenu.document.readyState;
					}
				catch (e) {}	
							
				if (fCheckTreeData || fExpandGuidCollection || sActionMenuReadyState=="loading")					
					{
						objLoadingInfo(0).innerText=sBusy;
						SetCursor("wait"); 						
					}
				else	
					{						
						if (!fLoadActionMenu)
							{
								objLoadingInfo(0).innerText=sReady;   	
								SetCursor("auto"); 
							}

						if (fLoadActionMenu && (sAutoLoadPageGUID=="" ||fAutoLoaded))
							{
								var DummyDate=new Date();
								var DummyTime=String(DummyDate.getTime());
								
								objRedDotTop.frames.ioActionMenu.location=sActionMenuURL + "&DummyTime=" + DummyTime;								
							}

						fLoadActionMenu=false;
						if (fStarted)
							{
								if (!fAutoLoaded)
									{
										if (sAutoLoadPageGUID!="")
											{
												var DummyDate=new Date();
												var DummyTime=String(DummyDate.getTime());
												objRedDotTop.document.frames.ioTreeData.document.location="ioRDLevel1.asp?Action=GotoTreeSegment&Guid=" + sAutoLoadPageGUID + "&Type=page" + "&DummyTime=" + DummyTime;
												fCheckTreeData=true;
												fAutoLoaded=true;
												fWaitingForAutoLoadData=true;
											}
									}
							}
						else
							{
								fAllFramesLoaded=true;		
								document.all("IMG-1").click();
							}
					}
			}

		function CheckTreeData()
			{var sReadyState=objRedDotTop.document.frames.ioTreeData.document.readyState;
								
				if (fCheckTreeData && sReadyState != "loading")					
					{
						if (objRedDotTop.document.frames.ioTreeData.document.body!=null)
							{
								if (objRedDotTop.document.frames.ioTreeData.document.body.innerText!="#")
									ExpandTreeSegment();				
							}
					}	
			}
			
		function ExpandGuidCollection()
			{var objSegments=objRedDotTop.document.frames.ioTreeData.document.all.tags("TREESEGMENT"); 
			 var i=0;	
			 	
				for (i=0; i<GuidArray.length; i++)
					{
						GuidArray[i]="";
					}	
				
				for (i=0; i<objSegments.length; i++)
					{
						GuidArray[i]=String(objSegments(i).guid);						
					}
					
				iGuidCollectionIndex=0;
				fExpandGuidCollection=true;
			}
			
		function SetTreeIndexToGUIDAndAppendLoadedSegments(sSearchGUID)
			{
				var objDiv=document.all.tags("DIV");
				var fFound=false;
				var sID="";
				var sActiveId=sLastSegmentId;		
				var sNextGUID="";
				var fLoop=true;
				var objOriginalTreeData=objRedDotTop.document.frames.ioTreeData.document.all.tags("SEGMENT");
								
				objRedDotTop.document.frames.ioTreeData.document.body.onload="";
				SetCursor("wait"); 
				
				if (SetTreeIndexToGUID(sSearchGUID))
					{				
						with (objRedDotTop.document.frames.ioTreeData.document)
							{
								open();
								write("#"); 
								close();
							}
						SetCursor("auto"); 
						document.all(sSegmentId).scrollIntoView();	
						SetInfoLabelPosition();
						return;
					}				
				
				var objSegment=objRedDotTop.document.frames.ioTreeData.document.all.tags("SEGMENT"); 
				
				if (objSegment.length>0)
					{
						if (objSegment(0).parentguid=="")
							objSegment(0).outerHTML="";
					}
												
				fFound=true;				
				while (fFound)
					{
						fFound=false;
						for (var i2=0; i2<objSegment.length; i2++)
							{
								var sCheckGUID=objSegment(i2).guid;								
								for (var i=0; i<objDiv.length; i++)
									{																																								
										if (objDiv(i).guid == sCheckGUID && objDiv(i).elttype!="linksitemap" && objDiv(i).elttype!="ContentClassInstance")// || objDiv(i).parentguid==cStartGUID || objSegment(i2).parentguid==cStartGUID)
											{																																				
												objSegment(i2).outerHTML="";															
												sNextGUID=sCheckGUID;
												fFound=true;
												break;
											}
									}
							}	
					}
				fFound=false;	
														
				if (sNextGUID != "" && objSegment.length > 0)
					{
						if (objSegment(0).parentguid!="")
							sSearchGUID=objSegment(0).parentguid;					
						else	
							{																								
								objSegment(0).outerHTML="";
								sSearchGUID=sNextGUID;
							}
					}					

				for (var i=0; i<objDiv.length; i++)
					{							
						if (objDiv(i).guid == sSearchGUID && objDiv(i).elttype!="linksitemap" && objDiv(i).elttype!="ContentClassInstance")
							{																	
								sID=String(objDiv(i).id);
								fFound=true;
								sSegmentId=sID;
								sLastSegmentId=sSegmentId;
									
								if(document.all("IMG" + sID).getAttribute("function") == "close")
									CloseTreeSegment(sSegmentId);									

								break;
							} 
					}				
					
				if (fFound)
					{
						ExpandTreeSegmentAndSetFocusOnLastSegment(objDiv(i),document.all(sActiveId));					
					}
				else
					{
						if (objOriginalTreeData.length==0)
							{
								HideInfoLabel();
								alert(document.all("ElementNotFound").value);	
							}
						else
							{								
								if (objOriginalTreeData(0).parentguid==cStartGUID)
									{
										with (objDiv(sActiveId).style)
											{
												borderWidth="0";																		
												borderStyle="solid";												
												borderColor=cWhite;
											}

										sSegmentId="-1";
										sLastSegmentId=sSegmentId;
										ExpandTreeSegmentAndSetFocusOnLastSegment(objDiv("-1"), objOriginalTreeData);
									}
								else//Teilbaumansicht
									{
										HideInfoLabel();
										alert(document.all("ElementNotFound").value);//Teilbaum erstmal deaktiviert!!!
									}
									/*
									{	
										with (objDiv(sActiveId).style)
											{
												borderWidth="0";																		
												borderStyle="solid";												
												borderColor=cWhite;
											}

										sSegmentId="-2";
										sLastSegmentId=sSegmentId;										
										var objDivAll=document.all(sSegmentId).children;
						
										for (var i=0; i<objDivAll.length; i++)
											{
												if (objDivAll(i).tagName=="DIV")
													{										
														objDivAll(i).outerHTML="";										
														if (String(objDivAll(i)) != "null")
															i--;
														else
															break;
													}
											}

										ExpandTreeSegmentAndSetFocusOnLastSegment(objDiv("-2"), objOriginalTreeData);
									}
									*/
							}
					}
				window.focus();					
			}
			
		function ExpandTreeSegmentAndSetFocusOnLastSegment(objDiv, objLastSegment)
			{
		    var objSegment=objRedDotTop.document.frames.ioTreeData.document.all.tags("SEGMENT"); 
			  var fFound=false;
				
				sLastAction="ExpandTreeSegment";			  					
				SetCursor("wait"); 
				fCheckTreeData=false;									
																				
				iImgArrayIndex=0;
				for (var i=0; i<objSegment.length; i++)
					{
						if (!fCancel)
							{
								SetSegmentProperties(objSegment,i);																																
								fAlphaStyle=(i<objSegment.length-1);
								AddTreeElement();																			
							}
					}				
				window.setTimeout("LoadImages()",1);										
				fAlphaStyle=false;	
				iLastId=0;
				fCancel=false;		
								
				var objTreeSegments=objRedDotTop.document.frames.ioTreeData.document.all.tags("SEGMENT");
				
				if (objTreeElement != null && objTreeSegments.length>0)
					{												
						for (var i=0; i<objTreeElement.children.length; i++)
							{
								if (objTreeElement.children(i).tagName=="DIV")
									{
										document.all("Col1" + objTreeElement.children(i).id).click();										
										fFound=true;
										break;
									}
							}

						if (objLastSegment!=null)
							{
								if (objLastSegment.style!=null)
									{
										with (objLastSegment.style)
											{
												borderWidth="0";																		
												borderStyle="solid";												
												borderColor=cWhite;
											}
									}
							}													
					}										

				if (!fFound)
					{
						var objSegment=objRedDotTop.document.frames.ioTreeData.document.all.tags("TREEELEMENT");
						
						if (objSegment(0)!=null)
							{
								if (String(objSegment(0).guid) != "undefined")
									{
										fFound=SetTreeIndexToGUID(objSegment(0).guid);
										if (fFound)
											{
												if (objLastSegment!=null)
													{
														with (objLastSegment.style)
															{
																borderWidth="0";																		
																borderStyle="solid";												
																borderColor=cWhite;
															}
													}
											}
									}		
							}						
						fCheckTreeData=false;	
					}					
				
				with (objRedDotTop.document.frames.ioTreeData.document)
					{
						open();
						write("#"); 
						close();
					}					
				
				if (fFound)
					{
						if (document.all(sLastSegmentId) != null)
							{
								document.all(sLastSegmentId).scrollIntoView();	
								SetInfoLabelPosition();
							}
					}
				else
					{
						HideInfoLabel();
						alert(document.all("ElementNotFound").value);
					}
		
				if (objDiv.id=="-2")
					document.all("IMG-2").src="TreeIcons" + sDialogTextDirection + "/empty.gif";
				
								
				window.focus();											
			}
			
		function GetParentTreeSegmentGuid()
			{var objDiv=document.all.tags("DIV");
				
				if (String(objDiv(sSegmentId).parentElement.guid) == "undefined")
					return "";
				else
					return objDiv(sSegmentId).parentElement.guid;					
			}
		
		function GetParentTreeSegmentType()
			{var objDiv=document.all.tags("DIV");
				
				if (String(objDiv(sSegmentId).parentElement.elttype) == "undefined")
					return "";
				else
					return objDiv(sSegmentId).parentElement.elttype;					
			}

		function ReloadParentTreeSegment()
			{var objDiv=document.all.tags("DIV");					
					
				SetCursor("wait"); 
				sSegmentId=objDiv(sSegmentId).parentElement.id;
				CloseTreeSegment(sSegmentId);
				document.all("IMG" +sSegmentId).click();
			}
		
		function RefreshActiveTreeSegment()
			{var objSegment=objRedDotTop.document.frames.ioTreeData.document.all.tags("TREEELEMENT"); 	
			 var fHasChildren=(objRedDotTop.document.frames.ioTreeData.document.all.tags("SEGMENT").length > 0);								
			 var objCol1=document.all("Col1" + sSegmentId);	
			 var objCol2=document.all("Col2" + sSegmentId);
			 var objImg=document.all("IMG" + sSegmentId);		
			 var objImgType=document.all("IMGType" + sSegmentId);					 
			 var iParentWidth=0;
			 var iChildWidth=0;

				SetCursor("wait"); 				
				SetSegmentProperties(objSegment,0)

				if (document.all("Col1" + sSegmentId) != null)
					{
						objImgType.src="TreeIcons" + sDialogTextDirection + "/" + sSegmentImage;										
						objCol1.style.color=sCol1FontColor;
						objCol1.style.fontWeight=sCol1FontWeight;							
						objCol1.innerText=" " + sCol1Value;
														
						objCol2.style.color=sCol2FontColor;
						objCol2.style.fontWeight=sCol2FontWeight;
						objCol2.innerText=" " + sCol2Value;
																		
						with (document.all("IMG" + sLastSegmentId))
							{															
								var iEmptyWidth=Number(document.all("IMGEmpty" + sLastSegmentId).width);
								var iExpandWidth=Number(document.all("IMG" + sLastSegmentId).width);												
								
								if (fHasChildren || Number(sLastSegmentId)<1)
									{										
										src="TreeIcons" + sDialogTextDirection + "/plus.gif";										
										/*
										if (iExpandWidth == 1)
											{
												document.all("IMG" + sLastSegmentId).width=15;
												document.all("IMGEmpty" + sLastSegmentId).width=iEmptyWidth-14;
											}*/
									}
								else
									{				
										//src="TreeIcons" + sDialogTextDirection + "/empty.gif";
										src="TreeIcons" + sDialogTextDirection + "/nofunction.gif";
										/*
										if (iExpandWidth > 1)
											{
												document.all("IMG" + sLastSegmentId).width=1;
												document.all("IMGEmpty" + sLastSegmentId).width=iEmptyWidth+14;
											}
										*/
									}
							}						
					
						var objDiv=document.all.tags("DIV");
									
						if (sActiveType!="project.1062" && sActiveType!="project.1720" && sActiveType.indexOf("sitemap")==-1)			
							{
								for (var i=0; i<objDiv.length; i++)
									{//Identische Elemente im Baum abgleichen					
										if (objDiv(sLastSegmentId) != null)
											{
												if (objDiv(i).guid == objDiv(sLastSegmentId).guid && objDiv(i).id!=sLastSegmentId && sActiveType != "elements")
													{																								
														
														var fCheckImages=(objDiv(i).elttype == sActiveType);																									
														var sID=objDiv(i).id;
														var objCol1=document.all("Col1" + sID);	
														var objCol2=document.all("Col2" + sID);
														var objImg=document.all("IMG" + sID);		
														var objImgType=document.all("IMGType" + sID);					 
														var iParentWidth=0;
														var iChildWidth=0;
														var fAlreadyExpanded=false;
				
															SetCursor("wait"); 														
															if (document.all("IMGEmpty" + sLastSegmentId).width < document.all("IMGEmpty" + sID).width)
																{
																	CloseTreeSegment(sID);				
																}
															else
																{
																	fAlreadyExpanded=true;
																}	
																
															SetSegmentProperties(objSegment,0);

															if (document.all("Col1" + sSegmentId) != null)
																{
																	if (fCheckImages)
																		{
																			if (sSegmentImage!="page.gif" && sSegmentImage!="pagekeyword.gif")
																				objImgType.src="TreeIcons" + sDialogTextDirection + "/" + sSegmentImage;										
																		}
																	objCol1.style.color=sCol1FontColor;
																	
																	if (sActiveType!="page" && sActiveType!="ContentClassInstance")
																		objCol1.style.fontWeight=sCol1FontWeight;							
																	
																	objCol1.innerText=" " + sCol1Value;

																	objCol2.style.color=sCol2FontColor;
																	
																	if (sActiveType!="page" && sActiveType!="ContentClassInstance")
																		objCol2.style.fontWeight=sCol2FontWeight;
																		
																	objCol2.innerText=" " + sCol2Value;
																																
																	/*
																	if (fCheckImages)
																		{
																			with (document.all("IMG" + sID))
																				{															
																					var iEmptyWidth=Number(document.all("IMGEmpty" + sID).width);
																					var iExpandWidth=Number(document.all("IMG" + sID).width);												
																						
																					if (fHasChildren || Number(sID)<1)
																						{										
																							if (fAlreadyExpanded)
																								src="TreeIcons" + sDialogTextDirection + "/minus.gif";																														
																							else
																								src="TreeIcons" + sDialogTextDirection + "/plus.gif";										
																																												
																							if (iExpandWidth == 1)
																								{
																									document.all("IMG" + sID).width=15;
																									document.all("IMGEmpty" + sID).width=iEmptyWidth-14;
																								}
																						}
																					else
																						src="TreeIcons" + sDialogTextDirection + "/nofunction.gif";										
																				}
																		}						
																	*/	
																} 
													}				
											}
									}															
							}
					}					
			}
				
		function ReloadTreeSegment()
			{
				iStartCounter++;
				if (sLastSegmentId == "0")
					sLastSegmentId="-1";
					
				CloseTreeSegment(sLastSegmentId);						

				//if (iStartCounter>1)					
					document.all("IMG" + sLastSegmentId).click();				
			}
			
		function ExpandLastChildNode()
			{			 			 
 				iIntervalId=window.setInterval("CheckExpandLastChildNodeNow()",100);		
			}
		
		function CheckExpandLastChildNodeNow()
			{
				if (!fCheckTreeData && !fExpandGuidCollection && !fLoadActionMenu)
					{
						window.clearInterval(iIntervalId);
						var objDiv=document.all.tags("DIV");			 
						var sGuid=objDiv(String(iTreeIndex)).guid;
			 					 
						SetTreeIndexToGUIDInFrame(sGuid);
					}
			}
		
		function SetTreeIndexToGUIDInFrame(sSearchGUID)
			{var objDiv=document.all.tags("DIV");
			 var fFound=false;
			 var sID="";
					
					for (var i=0; i<objDiv.length; i++)
						{
							if (objDiv(i).guid == sSearchGUID)
								{
								
									var objParent=objDiv(i).parentElement;
									var sValue=objParent.style.borderRight;
									
									if (sValue.indexOf("1px") != -1)
										{									
											sID=String(objDiv(i).id);
											fFound=true;
											sSegmentId=sID;

											if (iGuidCollectionIndex == GuidArray.length-1)
												{
													document.all("Col1" + sID).click();
												}
											else if(document.all("IMG" + sID).getAttribute("function") == "expand")
												{	
													CloseTreeSegment(sSegmentId);									
													document.all("IMG" + sID).click();
												}
											break;
										}
								} 
						}				
				return fFound;
			}
						
		function SetTreeIndexToGUID(sSearchGUID)
			{var objDiv=document.all.tags("DIV");
			 var fFound=false;
			 var sID="";
					
					for (var i=0; i<objDiv.length; i++)
						{
							if (objDiv(i).guid == sSearchGUID && objDiv(i).elttype!="linksitemap" && objDiv(i).elttype!="ContentClassInstance")
								{
									sID=String(objDiv(i).id);
									fFound=true;
									sSegmentId=sID;

									if (iGuidCollectionIndex == GuidArray.length-1 || iGuidCollectionIndex == 0)
										{
											document.all("Col1" + sID).click();
										}
									else if(document.all("IMG" + sID).getAttribute("function") == "expand")
										{	
											CloseTreeSegment(sSegmentId);									
											document.all("IMG" + sID).click();
										}

									break;
								} 
						}				

				return fFound;		
			}

		function SetTreeIndex(iId, sGUID, sSegmentType, sSegmentDescent)
			{var objSrcEltParentElt=window.event.srcElement.parentElement;
			 var sSrcEltImage=String(window.event.srcElement.src);			
			 var objSrcElement=window.event.srcElement;
			 var objSrcElementTagName="";
				
				sLastAction="SetTreeIndex";
				if (objSrcElement != null)
					objSrcElementTagName=objSrcElement.tagName;
					
				if (objSrcElementTagName != "DIV")
					{				
						if (sSrcEltImage.indexOf("plus.gif") == -1)
							{						
								if (objSrcEltParentElt.tagName != "DIV")
									objSrcEltParentElt=objSrcEltParentElt.parentElement;

								if (iId == -1)
									sSegmentId="-1";	
								else
									{	
										sSegmentId=String(objSrcEltParentElt.getAttribute("treeindex")); 
										if (document.all(sSegmentId) == null)
											sSegmentId="2";
									}								

								if (sLastSegmentId != sSegmentId)
									{
										SetCursor("wait"); 																
																				
										if ((fIE5 || fIE6) && !fError)
											{
												if (objRedDotTop.frames.ioActionMenu.document.body!=null)
													objRedDotTop.frames.ioActionMenu.document.body.innerText="";
											}																						
										
										fError=false;
										if (document.all(sLastSegmentId) != null)					
											{
												with (document.all(sLastSegmentId).style)
													{
														borderColor=cWhite;
														borderStyle="solid";												
														borderWidth="0";																		
													}	
											}
												
										if (document.all(sSegmentId) != null)							
											{
												with (document.all(sSegmentId).style)
													{
														borderColor=cGray;
														borderStyle="solid";												
														borderWidth="1";																		
													}
											}																
								
										sActiveType=sSegmentType;				
										sActiveDescent=sSegmentDescent;
										sActiveGUID=document.all(sSegmentId).guid;
										var sParentGuid=GetParentTreeSegmentGuid();										
										sLastSegmentId=sSegmentId;																							
										if (!fLoadActionMenu)
											{
												sActionMenuURL="ioRDLevel1.asp?Action=LoadActionMenu&Guid=" + sGUID + "&Type=" + sSegmentType + "&Descent=" + sSegmentDescent + "&ParentGuid=" + sParentGuid + "&SetTreeIndex=1"; 										
												if (sAutoLoadPageGUID=="" ||fAutoLoaded)
													fLoadActionMenu=true;
													//objRedDotTop.frames.ioActionMenu.location=sActionMenuURL;
											}
									}
							}
					}
			}
									
		function RequestTreeData(iId, sGUID, sSegmentType, sSegmentDescent)
			{var objDiv=document.all.tags("DIV");			
							  
			  sLastAction="RequestTreeData";
				SetCursor("wait");
								
				if (!fCheckTreeData)
					{
						sSegmentId=String(iId);
						var objActionElt=document.all("IMG" + sSegmentId);
						var sFunction=String(objActionElt.getAttribute("function"));
																	
						if ((fIE5 || fIE6) && fStarted && !fError)
							{
								if (objRedDotTop.frames.ioActionMenu.document.body!=null)
									objRedDotTop.frames.ioActionMenu.document.body.innerText="";		
							}
						
						fError=false;						
						if (objRedDotTop.document.frames.ioTreeData.document.body!=null)
							objRedDotTop.document.frames.ioTreeData.document.body.innerText="#";
																						
						if (String(objDiv(String(iId)).parentElement.guid) == "undefined")
							sParentGuid="";
						else
							sParentGuid=objDiv(String(iId)).parentElement.guid;
				
						if (document.all(sLastSegmentId) != null)					
							{
								with (document.all(sLastSegmentId).style)
									{
										borderColor=cWhite;
										borderStyle="solid";												
										borderWidth="0";																		
									}
							}			
											
						with (document.all(sSegmentId).style)
							{
								borderColor=cGray;									
								borderStyle="solid";												
								borderWidth="1";																		
							}	
						
						if (sFunction == "close")
							CloseTreeSegment(sSegmentId);
						else 
							{								
								var DummyDate=new Date();
								var DummyTime=String(DummyDate.getTime());
			
								objRedDotTop.document.frames.ioTreeData.location="ioRDLevel1.asp?Action=GetTreeData&Guid=" + sGUID + "&Type=" + sSegmentType + "&Descent=" + sSegmentDescent + "&ParentGuid=" + sParentGuid + "&DummyTime=" + DummyTime;
								fCheckTreeData=true;														
							}
							
						sActiveGUID=document.all(sSegmentId).guid;		
						sActiveType=sSegmentType;						
						sActiveDescent=sSegmentDescent;
						sLastSegmentId=sSegmentId;
						
						sActionMenuURL="ioRDLevel1.asp?Action=LoadActionMenu&Guid=" + sGUID + "&Type=" + sSegmentType + "&Descent=" + sSegmentDescent + "&ParentGuid=" + sParentGuid;
						if (sFunction == "close")																				
							sActionMenuURL=sActionMenuURL + "&SetTreeIndex=1"; 		
						
						fLoadActionMenu=true;
					}									
			}	
				
		function ReloadActionMenu()
			{
				//if (sLastReloadActiveGUID!=sActiveGUID)
					{
						//sLastReloadActiveGUID=sActiveGUID;
						var sParentGuid=GetParentTreeSegmentGuid();										
						sActionMenuURL="ioRDLevel1.asp?Action=LoadActionMenu&Guid=" + sActiveGUID + "&Type=" + sActiveType + "&Descent=" + sActiveDescent + "&ParentGuid=" + sParentGuid;			
						fLoadActionMenu=true;
					}
			}
					
		function ExpandTreeSegment()
			{var objSegment=objRedDotTop.document.frames.ioTreeData.document.all.tags("SEGMENT"); 

				//var DummyDate=new Date();
				//var DummyTime=String(DummyDate.getTime());
			  					
				sLastAction="ExpandTreeSegment";			  					
				SetCursor("wait"); 
				fCheckTreeData=false;					
								
				RefreshActiveTreeSegment();	
					
				iStartIndex=iTreeIndex;
				iImgArrayIndex=0;																				
				
				for (var i=0; i<objSegment.length; i++)
					{
						if (!fCancel)							
							{
								SetSegmentProperties(objSegment,i);		
								AddTreeElement();											
							}
					}				
				window.setTimeout("LoadImages()",1);		
				iLastId=0;
				fCancel=false;		
				
				with (objRedDotTop.document.frames.ioTreeData.document)
					{
						open();
						write("#"); 
						close();
					}

				fStarted=true;		

				if (document.all(sLastSegmentId) != null && objLoadingInfoDoc.all("chkAutoScroll").checked)
					{
						document.all(sLastSegmentId).scrollIntoView();	
						SetInfoLabelPosition();
					}
					
				//var Dummy2Date=new Date();
				//alert(String(Dummy2Date.getTime()-DummyDate.getTime()));
								
				window.focus();											
			}
				
		function CloseTreeSegment(sSegmentId)
			{						
				//if (sSegmentId == -1)											
					//iTreeIndex=1;
					
				sLastAction="CloseTreeSegment";								
				if (document.all("IMG" + sSegmentId) != null)
					{
						//document.all("IMGType" + sSegmentId).style.filter="";									
						document.all("IMG" + sSegmentId).setAttribute("function","expand");								
						document.all("IMG" + sSegmentId).src="TreeIcons" + sDialogTextDirection + "/plus.gif";										

						var objDivAll=document.all(sSegmentId).children;
						fClosing=true;
						
						for (var i=0; i<objDivAll.length; i++)
							{
								if (objDivAll(i).tagName=="DIV")
									{										
										objDivAll(i).outerHTML="";										
										if (String(objDivAll(i)) != "null")
											i--;
										else
											break;
									}
							}
					}
					
				fClosing=false	
			}
				
    function AddTreeElement()
			{	
				SetCursor("wait"); 
				if (!fClosing && !fCancel)
					{
						var objNode=document.createElement("DIV");					 
						var objDivElt=document.all(sSegmentId);
					 	
						if (objDivElt.parentElement.guid!=sSegmentParentGuid && sSegmentParentGuid!="0" && objDivElt.guid!=sSegmentParentGuid)						
							{
								for (var i=iStartIndex; i<=iTreeIndex;i++)
									{
										if (i>1) 
											{
												if (document.all(String(i))!=null)
													{
														if (document.all(String(i)).guid==sSegmentParentGuid)
															{
																objDivElt=document.all(String(i));
																break;
															}
													}
											}
									}
							}	
					 
						var objActionElt=document.all("IMG" + sSegmentId);
						var sFunction=String(objActionElt.getAttribute("function"));
						var fExpand=true;
						var fClose=false;
						var sChildCode="";					 
						
						if (iLastId  == 0 && sFunction == "close" && sSegmentId != "-2" && !fWaitingForAutoLoadData)//!!!
							fClose=true;
												
						if (fClose)
							{								
								fCancel=true;
								CloseTreeSegment(sSegmentId);								
							}
						else
							{																	
								if ((sFunction == "expand" || Number(sSegmentId)==iLastId) || sFunction == "null")
									{
										objActionElt.src="TreeIcons" + sDialogTextDirection + "/minus.gif";
										objActionElt.setAttribute("function","close");											
									}
								else if(sFunction != "null")
									{
										objActionElt.src="TreeIcons" + sDialogTextDirection + "/plus.gif";
										fClose=true;
									}
						
								if (fClose)
									{
										CloseTreeSegment(sSegmentId);
										objActionElt.setAttribute("function","expand");
									}
								else
									{
										if (objNode != null)
											objDivElt.appendChild(objNode);																																					
																				
										iImgArrayIndex++;
										iTreeIndex++;										
										var sWidth="15";

										if (objDivElt.getAttribute("commonwidth") != null)
											sWidth=String(Number(objDivElt.getAttribute("commonwidth")) + 15);

										var sCommonWidth=sWidth;						
										sSegmentTypeC34="'" + sSegmentType + "'";
										sGUIDC34="'" + sGUID + "'";
										sSegmentDescentC34="'" + sSegmentDescent + "'";
										
										if (sSegmentClose == "1")
											{
												sWidth=String(Number(sWidth)-11);																																				
												//sChildCode='<DIV elttype="' + sSegmentType + '" guid="' + sGUID + '" onclick="SetTreeIndex(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" treeindex="' + String(iTreeIndex) + '" function="close" commonwidth="' + sCommonWidth + '" commonid="' + sSegmentId + '" id=' + String(iTreeIndex) + '><IMG ondblclick="AddToClipboard()" id=IMGEmpty' + String(iTreeIndex) + ' width=' + sWidth + ' src="TreeIcons' + sDialogTextDirection + '/empty.gif"><IMG  ondblclick="AddToClipboard()" id=IMG' + String(iTreeIndex) + ' onclick="RequestTreeData(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" src="TreeIcons' + sDialogTextDirection + '/minus.gif" function="close"><IMG ondblclick="AddToClipboard()" id=IMGType' + String(iTreeIndex) + ' src="TreeIcons' + sDialogTextDirection + '/' + sSegmentImage + '"><A ondblclick="AddToClipboard()" id="Col1' + String(iTreeIndex) + '" style="font-weight: ' + sCol1FontWeight + ';color:' + sCol1FontColor + '"></A><A ondblclick="AddToClipboard()" id="Col2' + String(iTreeIndex) + '" style="font-weight: ' + sCol2FontWeight + ';color:' + sCol2FontColor + '"></A></DIV>';																																																																					
												sChildCode='<DIV elttype="' + sSegmentType + '" guid="' + sGUID + '" onclick="SetTreeIndex(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" treeindex="' + String(iTreeIndex) + '" function="close" commonwidth="' + sCommonWidth + '" commonid="' + sSegmentId + '" id=' + String(iTreeIndex) + '><IMG style="visibility:hidden" ondblclick="AddToClipboard()" id=IMGEmpty' + String(iTreeIndex) + ' width=' + sWidth + '><IMG style="visibility:hidden" ondblclick="AddToClipboard()" id=IMG' + String(iTreeIndex) + ' onclick="RequestTreeData(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" function="close"><IMG style="visibility:hidden" ondblclick="AddToClipboard()" id=IMGType' + String(iTreeIndex) + '><A ondblclick="AddToClipboard()" id="Col1' + String(iTreeIndex) + '" style="font-weight: ' + sCol1FontWeight + ';color:' + sCol1FontColor + '"></A><A ondblclick="AddToClipboard()" id="Col2' + String(iTreeIndex) + '" style="font-weight: ' + sCol2FontWeight + ';color:' + sCol2FontColor + '"></A></DIV>';																																																																					
												IMGArray[iImgArrayIndex]='minus.gif';
												IMGTypeArray[iImgArrayIndex]=sSegmentImage;
											}
										else if (sSegmentExpand == "0")
											{
												sWidth=String(Number(sWidth)-11);																																				
												//sChildCode='<DIV elttype="' + sSegmentType + '" guid="' + sGUID + '" onclick="SetTreeIndex(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" treeindex="' + String(iTreeIndex) + '" function="nothing" commonwidth="' + sCommonWidth + '" commonid="' + sSegmentId + '" id=' + String(iTreeIndex) + '><IMG  ondblclick="AddToClipboard()" id=IMGEmpty' + String(iTreeIndex) + ' width=' + sWidth + ' src="TreeIcons' + sDialogTextDirection + '/empty.gif"><IMG  ondblclick="AddToClipboard()" id=IMG' + String(iTreeIndex) + ' onclick="RequestTreeData(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" src="TreeIcons' + sDialogTextDirection + '/nofunction.gif" function="nothing"><IMG ondblclick="AddToClipboard()" id=IMGType' + String(iTreeIndex) + ' src="TreeIcons' + sDialogTextDirection + '/' + sSegmentImage + '"><A ondblclick="AddToClipboard()" id="Col1' + String(iTreeIndex) + '" style="font-weight: ' + sCol1FontWeight + ';color:' + sCol1FontColor + '"></A><A ondblclick="AddToClipboard()" id="Col2' + String(iTreeIndex) + '" style="font-weight: ' + sCol2FontWeight + ';color:' + sCol2FontColor + '"></A></DIV>';																																																									
												sChildCode='<DIV elttype="' + sSegmentType + '" guid="' + sGUID + '" onclick="SetTreeIndex(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" treeindex="' + String(iTreeIndex) + '" function="nothing" commonwidth="' + sCommonWidth + '" commonid="' + sSegmentId + '" id=' + String(iTreeIndex) + '><IMG style="visibility:hidden" ondblclick="AddToClipboard()" id=IMGEmpty' + String(iTreeIndex) + ' width=' + sWidth + '><IMG style="visibility:hidden" ondblclick="AddToClipboard()" id=IMG' + String(iTreeIndex) + ' onclick="RequestTreeData(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" function="nothing"><IMG style="visibility:hidden" ondblclick="AddToClipboard()" id=IMGType' + String(iTreeIndex) + '><A ondblclick="AddToClipboard()" id="Col1' + String(iTreeIndex) + '" style="font-weight: ' + sCol1FontWeight + ';color:' + sCol1FontColor + '"></A><A ondblclick="AddToClipboard()" id="Col2' + String(iTreeIndex) + '" style="font-weight: ' + sCol2FontWeight + ';color:' + sCol2FontColor + '"></A></DIV>';																																																									
												IMGArray[iImgArrayIndex]='nofunction.gif';
												IMGTypeArray[iImgArrayIndex]=sSegmentImage;
											}
										else
											{
												sWidth=String(Number(sWidth)-11);																																				
												//sChildCode='<DIV elttype="' + sSegmentType + '" guid="' + sGUID + '" onclick="SetTreeIndex(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" treeindex="' + String(iTreeIndex) + '" function="expand" commonwidth="' + sCommonWidth + '" commonid="' + sSegmentId + '" id=' + String(iTreeIndex) + '><IMG  ondblclick="AddToClipboard()" id=IMGEmpty' + String(iTreeIndex) + ' width=' + sWidth + ' src="TreeIcons' + sDialogTextDirection + '/empty.gif"><IMG  ondblclick="AddToClipboard()" id=IMG' + String(iTreeIndex) + ' onclick="RequestTreeData(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" src="TreeIcons' + sDialogTextDirection + '/plus.gif" function="expand"><IMG ondblclick="AddToClipboard()" id=IMGType' + String(iTreeIndex) + ' src="TreeIcons' + sDialogTextDirection + '/' + sSegmentImage + '"><A ondblclick="AddToClipboard()" id="Col1' + String(iTreeIndex) + '" style="font-weight: ' + sCol1FontWeight + ';color:' + sCol1FontColor + '"></A><A ondblclick="AddToClipboard()" id="Col2' + String(iTreeIndex) + '" style="font-weight: ' + sCol2FontWeight + ';color:' + sCol2FontColor + '"></A></DIV>';																																																									
												sChildCode='<DIV elttype="' + sSegmentType + '" guid="' + sGUID + '" onclick="SetTreeIndex(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" treeindex="' + String(iTreeIndex) + '" function="expand" commonwidth="' + sCommonWidth + '" commonid="' + sSegmentId + '" id=' + String(iTreeIndex) + '><IMG style="visibility:hidden" ondblclick="AddToClipboard()" id=IMGEmpty' + String(iTreeIndex) + ' width=' + sWidth + '><IMG style="visibility:hidden" ondblclick="AddToClipboard()" id=IMG' + String(iTreeIndex) + ' onclick="RequestTreeData(' + iTreeIndex + ',' + sGUIDC34 + ',' + sSegmentTypeC34 + ',' + sSegmentDescentC34 + ')" function="expand"><IMG style="visibility:hidden" ondblclick="AddToClipboard()" id=IMGType' + String(iTreeIndex) + '><A ondblclick="AddToClipboard()" id="Col1' + String(iTreeIndex) + '" style="font-weight: ' + sCol1FontWeight + ';color:' + sCol1FontColor + '"></A><A ondblclick="AddToClipboard()" id="Col2' + String(iTreeIndex) + '" style="font-weight: ' + sCol2FontWeight + ';color:' + sCol2FontColor + '"></A></DIV>';																																																									
												IMGArray[iImgArrayIndex]='plus.gif';
												IMGTypeArray[iImgArrayIndex]=sSegmentImage;
											}	
										
										if (objNode != null)	
											objNode.outerHTML=sChildCode;	
										else	
											objDivElt.innerHTML=objDivElt.innerHTML + sChildCode;	
										
										document.all("Col1" + String(iTreeIndex)).innerText=" " + sCol1Value;
										document.all("Col2" + String(iTreeIndex)).innerText=" " + sCol2Value;																																
									}
							}								
						
						if (fAlphaStyle)
							{
								//document.all("IMGType" + String(iTreeIndex)).style.filter="shadow(color=#808080,direction=135,strength=100)";																	
								if (document.all("IMGType" + String(iTreeIndex))!=null)
									{										
										if (document.all("IMGEmpty" + String(iTreeIndex)).width > 14)
											{
												if (String(document.all("IMGType" + String(iTreeIndex)).style)!="undefined")
													document.all("IMGType" + String(iTreeIndex)).style.filter="Alpha(opacity=30)";									
											}
									}
							}
							
						iLastId=Number(sSegmentId);		
						objTreeElement=objDivElt;																								
	
						if (fAutoLoaded)
							fWaitingForAutoLoadData=false;

					}
			}		

  	function DeleteSegment()
			{
				document.all("IMG" + sSegmentId).parentElement.outerHTML="";
			}
		
		function SetSegmentProperties(objSegment,i)
			{
				if (objSegment(i) != null)
					{
							
						if (String(objSegment(i).descent) == "undefined")
							sSegmentDescent="unknown";
						else
							sSegmentDescent=objSegment(i).descent;
							
						if (String(objSegment(i).flags) == "undefined")
							iFlags=0;
						else
							iFlags=Number(objSegment(i).flags);
								
						if (String(objSegment(i).guid) == "undefined")
							sGUID="0";
						else
							sGUID=objSegment(i).guid;									
								
						if (String(objSegment(i).type) == "undefined")
							sSegmentType="project";
						else
							sSegmentType=objSegment(i).type;																																				

						if (String(objSegment(i).imagetype) == "undefined")
							sSegmentImageType="0";
						else
							sSegmentImageType=objSegment(i).imagetype;								

						if (sSegmentImageType == "0")
							sSegmentImageType="1";										
																		
						if (String(objSegment(i).image) == "undefined")
							sSegmentImage="";
						else
							sSegmentImage=objSegment(i).image;								

						if (sSegmentImageType == "0")
							sSegmentImageType="1";										

						if (String(objSegment(i).col1value) == "undefined")
							sCol1Value="";
						else
							sCol1Value=objSegment(i).col1value;								
						
						sCol1Value=sCol1Value.replace(/\&apos;/g,"'");

						if (String(objSegment(i).col2value) == "undefined")
							sCol2Value="";
						else
							sCol2Value=objSegment(i).col2value;					
						
						sCol2Value=sCol2Value.replace(/\&apos;/g,"'");
											
						if (String(objSegment(i).col1fontcolor) == "undefined")
							sCol1FontColor=cBlack;
						else
							sCol1FontColor=objSegment(i).col1fontcolor;		
														
						if (String(objSegment(i).col2fontcolor) == "undefined")
							sCol2FontColor=cBlack;
						else
							sCol2FontColor=objSegment(i).col2fontcolor;		

						if (String(objSegment(i).col1fontweight) == "undefined")
							sCol1FontWeight="";
						else
							sCol1FontWeight=objSegment(i).col1fontweight;		

						if (String(objSegment(i).col2fontweight) == "undefined")
							sCol2FontWeight="";
						else
							sCol2FontWeight=objSegment(i).col2fontweight;		

						if (String(objSegment(i).close) == "undefined")
							sSegmentClose="0";
						else
							sSegmentClose=objSegment(i).close;								

						if (sSegmentClose== "")
							sSegmentClose="0";	

						if (String(objSegment(i).expand) == "undefined")
							sSegmentExpand="0";
						else
							sSegmentExpand=objSegment(i).expand;								

						if (sSegmentExpand== "")
							sSegmentExpand="0";	
																										
						if (String(objSegment(i).parentguid) == "undefined")
							sSegmentParentGuid="0";
						else
							sSegmentParentGuid=objSegment(i).parentguid;								

						if (sSegmentParentGuid== "")
							sSegmentParentGuid="0";	

						if (sSegmentImage == "")
							sSegmentImage="TreeType" + sSegmentImageType + ".gif";																						
					}
			}
			
		function SetCursor(sStatus)
			{					
				if (sStatus=="auto")
					{
						if (document.styleSheets(0).rules.item(0).style.cursor=="hand")
							return;

						document.styleSheets(0).rules.item(0).style.cursor="hand";
						document.styleSheets(0).rules.item(1).style.cursor="hand";
						document.styleSheets(0).rules.item(2).style.cursor="hand";
						objLoadingInfo(0).innerText=sReady;	
						status=sReady;							
						FadeOutInfoLabel();			  									
					}
				else
					{
						if (document.styleSheets(0).rules.item(0).style.cursor==sStatus)
							return;

						document.styleSheets(0).rules.item(0).style.cursor=sStatus;
						document.styleSheets(0).rules.item(1).style.cursor=sStatus;
						document.styleSheets(0).rules.item(2).style.cursor=sStatus;
						objLoadingInfo(0).innerText=sBusy;				
						status=sBusy;	
						//ShowInfoLabel();			  														
					}
						
				document.body.style.cursor=sStatus; 					
			}	
				
		function CheckCursor()
			{
				if (!fCheckTreeData)		
					{
						if (document.styleSheets(0).rules.item(0).style.cursor=="hand")
							return;

						document.body.style.cursor="hand"; 					
						document.styleSheets(0).rules.item(0).style.cursor="hand";
						document.styleSheets(0).rules.item(1).style.cursor="hand";
						document.styleSheets(0).rules.item(2).style.cursor="hand";
						objLoadingInfo(0).innerText=sBusy;									
						status=sBusy;
						//ShowInfoLabel();				  									
					}
				else
					{
						if (document.styleSheets(0).rules.item(0).style.cursor=="sStatus")
							return;

						document.body.style.cursor="auto"; 					
						document.styleSheets(0).rules.item(0).style.cursor=sStatus;
						document.styleSheets(0).rules.item(1).style.cursor=sStatus;
						document.styleSheets(0).rules.item(2).style.cursor=sStatus;
						objLoadingInfo(0).innerText=sReady;									
						status=sReady;	
						FadeOutInfoLabel();			  									
					}
			}	

		function AddToClipboard()
			{				
				if (window.event.shiftKey)//Alle Segmente dieser Ebene in die Ablage kopieren
					objRedDotTop.frames.ioClipboard.AddAllPagesOfCurrentIndent();
				else	
					objRedDotTop.frames.ioClipboard.AddEntry();		
			}
		
		function SaveTree()
			{
				sSaveTreeHtmlCode=document.all("-1").innerHTML;
				sSaveSegmentId=sSegmentId;
			}
			
		function LoadTree()
			{
				document.all("-1").innerHTML=sSaveTreeHtmlCode;
				window.setTimeout("LoadMenu()",1000);
			}	
		
		function LoadMenu()
			{				
				CloseTreeSegment(sSaveSegmentId);
				document.all("IMG" +sSaveSegmentId).click();
			}	
			
		function SaveAutoScrollSetting(objThis)	
			{				
				if (!fCheckTreeData && !fExpandGuidCollection && objRedDotTop.frames.ioActionMenu.document.readyState!="loading")					
					{						
						var sValue="";
						if (objThis.checked)
							sValue="1";
						else
							sValue="0";
											
						objRedDotTop.document.frames.ioTreeData.location="ioRDLevel1.asp?Action=SaveAutoScrollSetting&Value=" + sValue;
					}
			}
		
		function LoadImages()
			{								
				for (var iIndex=iTreeIndex;iIndex>0;iIndex--)
					{
						if (iImgArrayIndex<1)
							break;
							
						document.all("IMGEmpty" + String(iIndex)).src="TreeIcons" + sDialogTextDirection + "/empty.gif";
						document.all("IMGEmpty" + String(iIndex)).style.visibility="visible";
						document.all("IMG" + String(iIndex)).src="TreeIcons" + sDialogTextDirection + "/" + IMGArray[iImgArrayIndex];				
						document.all("IMG" + String(iIndex)).style.visibility="visible";
						document.all("IMGType" + String(iIndex)).src="TreeIcons" + sDialogTextDirection + "/" + IMGTypeArray[iImgArrayIndex];				
						document.all("IMGType" + String(iIndex)).style.visibility="visible";
						iImgArrayIndex--;
					}								
			}	
