var pop = new Object;
var _NN67,_OP678; // NN67=Netscape6,7,8 OP678=Opera 6,7,8

onload=init;

function init()
{
 // �e�I�v�V�����̐ݒ�
 pop.opt = new Object;
 pop.opt.idpopup = 1;             // 1:ID���o�@�\���g�p����
 pop.opt.mailpopup = 1;           // 1:���[�����|�b�v�A�b�v���g�p����
 pop.opt.refpopup = 1;            // 1:��Q�ƃ��X�|�b�v�A�b�v���g�p����
 pop.opt.respopup = 1;            // 1:���X�|�b�v�A�b�v���g�p����
 pop.opt.opa = 1;                 // 1:�|�b�v�A�b�v�E�B���h�E�𔼓���������
 pop.opt.schpanel = 1;            // 1:�����p�l����L���ɂ���
 pop.opt.refskin30 = 0;           // 1:skin30-x�Ɠ����ʒu�Ŕ�Q�ƃ|�b�v�A�b�v���s��
 // �e�ϐ��̐ݒ�
 pop.max=15;                      // �|�b�v�A�b�v���C���[�̌��E��(0~99)
 pop.lev=0;                       // �|�b�v�A�b�v�̐[��(0~pop_max)
 pop.lay= new Array(pop.max);     // �|�b�v�A�b�v���C���[�̗v�f
 pop.ids = new Array;             // ID���L�����邽�߂̔z��
 pop.refs = new Array;            // ���X�A���J�[�̊֌W���L�����邽�߂̔z��
 pop.res = new Array;             // ���C���[����ID�܂��̓��X�̎w�����L�����镶����z��
 pop.dir = new Object;            // �|�b�v�A�b�v�̏o������(x,y)
 pop.flg = new Object;            // �|�b�v�A�b�v����p
 pop.flg.cnt = 0;                 // �v�f���痣�ꂽ�ꍇ�̃|�b�v�A�b�v����
 pop.flg.mout = 0;                // �ǂ̃|�b�v�A�b�v�̃��C���[���痣�ꂽ�����L��
 pop.flg.touch = 0;               // �ǂ̃|�b�v�A�b�v�̃��C���[�ɐG�ꂽ�����L��
 pop.timer = new Object;          // �^�C�}�[����p 
 pop.pnl_y = 16;                  // �����p�l����y���W
 _NN67=navigator.userAgent.match(/Netscape.[67]/);
 _OP678=navigator.userAgent.match(/Opera.[678]/);
 // �C�x���g�̐ݒ�
 document.onmouseover = event_mouseover;
 document.onmouseout = event_mouseout;
 if (pop.opt.idpopup+pop.opt.refpopup!=0) document.onmousedown = event_click;
 if (pop.opt.schpanel==1) {
  grep3(0,"ini");
  grep3(0,"resize");
  if (document.all && !window.opera) document.onmousemove = new Function("grep3(0,'move')");
 }
 event_resize();
 window.onresize = event_resize;
 // �v�f�̍쐬
 var i,s;
 for (i=0;i<=pop.max;i++) {
  pop.lay[i] = document.createElement("div");
  if (i<10) sl="0"+String(i); else sl=String(i);
  // �|�b�v�A�b�v�E�B���h�E�̃f�U�C�����w��
  pop.lay[i].id="sty"+sl;
  pop.lay[i].style.top             = "0px";
  pop.lay[i].style.position        = "absolute";
  pop.lay[i].style.fontSize        = document.body.style.fontSize;    // �t�H���g�T�C�Y
  pop.lay[i].style.border          = "1px solid gray";                // �g
  pop.lay[i].style.padding         = "6px";                           // �g�ƕ����Ƃ̊Ԋu
  pop.lay[i].style.color           = "#000000";                       // �����F
  pop.lay[i].style.backgroundColor = "#f5fffa";                       // �w�i�F
  pop.lay[i].style.visibility      = "hidden";
  document.body.appendChild(pop.lay[i]);
 }
  // ���ׂĂ�a�^�O�̑����l�����H
  if (document.getElementById("html401")!=null) {
  var ss = new Array;
   var spn,bh;
  s=document.getElementsByTagName("A");
  for (i=0;i<s.length;i++) ss[i]=s[i];
  for (i=0;i<s.length;i++) {
   try { if (!ss[i].getAttribute("href")) continue; } catch(e) { continue; }
   if (ss[i].className=="blank") ss[i].target="_blank"; // �ʑ��ŊJ��
   if (ss[i].className=="mail") {
     bh=window.location.href.replace(/\/[^/]+$/,"")+'/';
    bh=ss[i].href.replace(bh,"");
    if (bh=="sage") ss[i].style.color="#660099"; // ���[�������F
    ss[i].href="mailto:"+bh;
   }
  }
 }

}

function event_click(e) // ��ʃN���b�N�̏���
{
 var s,spn;
 if (document.all) {
  // ���N���b�N�ȊO�ɂ͔������Ȃ�
  s=window.event.srcElement;
  if (!window.opera && event.button!=1) return;
  try { spn=(s.tagName=="A" && s.href==null); } catch(e) { return; } // IE��URL�G���R�[�h�Ɋւ���G���[���
 }
 else {
  if (e.button!=0) return;
  s=e.target;
 }
 if (s==null) return;
 pop.tags=s.tagName;
 for (;;) {
  var rect=get_cursor(e); // ���݈ʒu�̎擾
  var resnum,ar=new Array;
  if (s.tagName!='DT' && s.tagName!='A' && !(s.tagName=='DIV' && s.id.substr(5,1)=='a')) return;
  if (s.tagName=='A' && !s.getAttribute("href") && s.name!="") {
   resnum=parseInt(s.name.match(/[0-9]{1,5}$/));
   ar[2]=rect[0]-parseInt(document.body.offsetLeft);
   if (resnum==null) break;
  }
  else {
   ar=check_dtpos(s,rect[0]);
   resnum=ar[1];
   if (ar[0]==0) return;
   if (ar[0]==1) break;
  }
  // ��Q�ƃ��X�|�b�v�A�b�v
  if (pop.opt.refpopup==0) break;
  var ref=findrefres(resnum);
  if (ref==null) pophtml="(���̓��e�ɑ΂��郌�X�͂���܂���)";
  else {
   control_multiplepopup(s); // ���d�|�b�v�A�b�v����
   // �|�b�v�A�b�vHTML�̓��e�̕ҏW
   var pophtml=edit_popuphtml(ref);
   if (pophtml=="") return;
  }
  // ���X�ԍ����L������
  pop.res[pop.lev+1]=String(resnum);
  // ���C���[�̕\��
  pop.lev++;
  show_popup(pophtml,ar[2],rect[1],4+(ref==null)*7);
  return;
 }
 for (;;) {
  if (pop.opt.idpopup==0) break;
  if (s.tagName!='DT' && (s.tagName!='DIV' || s.id.substr(5,1)!='a')) break;
  // ���t���N���b�N��ID�|�b�v�A�b�v�̏������s��
  if (pop.lev==pop.max) break; // pop.max�ڂ̃|�b�v�A�b�v�͖���
  var ida=findid(s);
  if (ida[0]==null || ida[0].match(/^\?\?\?/)) return; // �C��ID�͏��O����
  // ���̃��C���[��ID���r����
  var c=0,i=1;
  for (;i<=pop.lev;i++) { if (ida[0]==pop.res[i]) c++; }
  if (c>=2) return; // ����ID��3�x�|�b�v�A�b�v���Ȃ�
  control_multiplepopup(s); // ���d�|�b�v�A�b�v����
  // �|�b�v�A�b�vHTML�̓��e�̕ҏW
  var pophtml="";
  if (ida[1].indexOf(" ")==-1)
   pophtml="(���ɓ���ID�̓��e�͂���܂���)";
  else
   pophtml=edit_popuphtml(ida[1]);
  pop.res[pop.lev+1]=ida[0]; // ID���L������
  // ���C���[�̕\��
  pop.lev++;
  show_popup(pophtml,rect[0],rect[1],(pophtml.substr(0,1)=='(')*8+2);
  return;
 }
}

function event_mouseover(e,p1) // �}�E�X���I�u�W�F�N�g�̏��ʉ߂������̏���
{
 var s,spn;
 if (document.all) {
  if (p1=='panel1') s=e; else s=window.event.srcElement;
  try { spn=(s.tagName=="A" && s.href==null); } catch(e) { return; } // IE�̃G���[���
 }
 else s=e.target;
 if (s.parentElement) spn=s.parentElement; else spn=s.parentNode;
 for (;;) {
  if (s.id=='panel1' || p1=='panel1') {
   s.firstChild.style.display="block";
   s.style.height=s.firstChild.style.height;
  }
  if (s.id.substr(0,3)=='sty' || s.id.substr(0,3)=='pop') {
   lay_mouseover(s);
   break;
  }
  if (s.tagName!='A' && s.tagName!='B') break;
  var ss;
  if (s.tagName=='A') ss=s; else ss=spn;
  if (ss==null || !ss.getAttribute("href") || pop.opt.mailpopup==0) break;
  // ���[�����̃|�b�v�A�b�v
  if (ss.href.substr(0,7)!="mailto:") break;
  if (ss.href.indexOf("%",0)!=-1)
   ss.setAttribute("title",decodeURI(ss.href.replace(/^mailto:/,"")));
  else
   ss.setAttribute("title",ss.href.replace(/^mailto:/,""));
  return;
 }
 for (;;) {
  if (s.tagName!='A' || pop.lev==pop.max || pop.opt.respopup==0) break; // pop.max�ڂ̃|�b�v�A�b�v�͖���
  // ���X�A���J�[�̃|�b�v�A�b�v
  // ���X�A���J�[�̎n�_�ƏI�_�̔���
  if (spn.tagName=="SPAN" || spn.tagName=="BODY") break; // �u�ŐV50�v�Ȃǂ̃w�b�_�[�ƃt�b�^�[�̃����N�ɂ͔������Ȃ�
  pop.tags=s.tagName;
  var anc=get_resnumfroma(s); // �����N�����񂩂�w�背�X�͈̔͂��擾
  if (anc==null) break;
  control_multiplepopup(spn); // ���d�|�b�v�A�b�v����
  // �������e��3�x�|�b�v�A�b�v���Ȃ�
  var c=0,i=1,lv,sa="";
  for (i=0,pop.res[pop.lev+1]="";i<anc.length;i++) pop.res[pop.lev+1]+=anc[i]+" ";
  for (lv=1;lv<=pop.lev;lv++) {
   if (pop.res[pop.lev+1]==pop.res[lv]) c++;
  }
  if (c>=2) return;
  // �|�b�v�A�b�vHTML�̓��e�̕ҏW
  for (i=0;i<anc.length && i<25;i++) sa+=anc[i]+" "; // 26���X�ȍ~�͏ȗ�����
  var pophtml=edit_popuphtml(sa);
  if (pophtml=="") return;
  // ���݈ʒu�̎擾
  var rect=get_cursor(e);
  // ���C���[�̕\��
  pop.lev++;
  show_popup(pophtml,rect[0],rect[1],1);
  return;
  }
}

function event_mouseout(e) // �}�E�X���I�u�W�F�N�g�̏�𗣂ꂽ���̏���
{
 var s;
 if (document.all) s=window.event.srcElement; else s=e.target;
 if (pop.lev==0) return;
 // �|�b�v�A�b�v������Ƀ|�b�v�A�b�v���̗v�f���痣���ƃ^�C�}�[��ݒu���ăt���O�𗧂Ă�
 // 750�~���b�̊ԂɃ|�b�v�A�b�v�̃��C���[�ɐG��Ȃ��ꍇ�̓|�b�v�A�b�v����������
 if (pop.flg.cnt>1 && s.tagName==pop.tags) {
  if (pop.lay[pop.lev].style.visibility!="visible") return;
  pop.flg.cnt=1;
  pop.flg.mout=pop.lev;
  pop.flg.touch=0;
  if (pop.timer.i!=null) clearTimeout(pop.timer.i);
  pop.timer.i=setTimeout("event_timer()",750);
 }
 if (s.id.substr(0,3)=='sty' || s.id.substr(0,3)=='pop') {
  lay_mouseout(s);
 }
}

function event_timer() // �^�C�}�[�֘A�̏���
{
 if (pop.timer.i!=null) pop.flg.cnt=0;
 pop.timer.t=null , pop.timer.i=null;
 // ���C���[���痣��đ��̃��C���[�ɐG���Ă��Ȃ��ꍇ�͑S�ď������A
 // x�Ԗڂ̃��C���[�ɐG���Ă���ꍇ��x+1�Ԗڈȍ~�̃��C���[����������
 if (pop.flg.mout==pop.flg.touch) return;
 var v;
 if (pop.flg.touch==0) v=1; else v=pop.flg.touch+1;
 hide_popup(v);
 pop.lev=(v-1)*(pop.lev>0);
}

function event_resize() // �E�B���h�E�̃T�C�Y���ύX���ꂽ�ꍇ�̏���
{
 if (document.all && !window.opera) {
  document.all.tags("DL")[0].style.cssText="width:"+String(screen.width-40)+"px";
  document.all.tags("DT")[0].style.cssText="width:"+String(screen.width-40)+"px";
 }
 if (pop.opt.schpanel==1) grep3(0,"resize");
}

function lay_mouseover(e) // �}�E�X���|�b�v�A�b�v�̃��C���[���ʉ߂������̏���
{
 var c=parseInt(e.id.substr(3,2),10);
 pop.flg.touch=c;
 if (pop.flg.cnt==1 && pop.flg.mout<=c) {
  // �|�b�v�A�b�v���ăA���J�[�𗣂ꂽ��Ɉ�莞�Ԉȓ���
  // �|�b�v�A�b�v�������C���[�ɐG�ꂽ�̂Ń|�b�v�A�b�v������������
  pop.flg.cnt = 0;
  if (pop.timer.i!=null) clearTimeout(pop.timer.i);
  pop.timer.i=null;
 }
}

function lay_mouseout(e) // �}�E�X���|�b�v�A�b�v�̃��C���[��𗣂ꂽ���̏���
{
 // �^�C�}�[���Z�b�g����250�~���b��ɏ�������
 // ���ɍ������C���[�Ń|�b�v�A�b�v�����t���O�������Ă���ꍇ�͂��̂܂܂ɂ���
 if (!(pop.timer.t!=null && pop.flg.mout>parseInt(e.id.substr(3,2),10))) pop.flg.mout=parseInt(e.id.substr(3,2),10);
 pop.flg.touch=0;
 if (pop.timer.t!=null) clearTimeout(pop.timer.t);
 pop.timer.t=setTimeout("event_timer()",250);
}

function get_resnumfroma(s) // a�v�f���烌�X�A���J�[���w�肵�����e�̂��ׂĂ�z��ŕԂ�
{
 if (s==null) return;
 for (;;) {
  try { var spn=(s.tagName=="A" && s.href==null); } catch(e) { return; } // IE�̃G���[���
  if (s.href.match(/\/[0-9]{9,10}\/[0-9]{1,5}$/)) break; // read.cgi
  if (s.href.match(/#.{0,3}[0-9]{1,5}$/)) break; // dat2html
  return null;
 }
 var lstr=mbdtosbd(s.innerHTML).replace(/&gt;|\>/g,"").replace(/[\+\,]/g," "); // �S�p�����𔼊p�����ɁA�Q�ƋL��������
 if (lstr.match(/[^0-9\s\-]/)) return null; // �����Ɣ͈͂������L���ȊO���܂܂��ꍇ�͖����Ƃ���
 if (lstr.indexOf("-")==-1) {
  return lstr.split(" ");
 }
 // �͈͂������L�����܂܂�Ă���ꍇ
 var lsa=lstr.split(" "),i,j;
 for (i=0,lstr="";lsa[i]!=null;i++) {
  if (lsa[i].indexOf("-")==-1) {
   lstr+=lsa[i]+" ";
   continue;
  }
  var sp,ep;
  sp=parseInt(lsa[i].match(/^[0-9]+/));
  ep=parseInt(lsa[i].match(/[0-9]+$/));
  if (isNaN(ep)) ep=sp+24; // �I�_�̎w�肪�����ꍇ
  if (ep-sp>998) ep=sp+999;
  for (j=sp;j<=ep;j++) lstr+=String(j)+" ";
 }
 return lstr.split(" ");
}

function get_resnumfromdt(s) // �w�肵��dt�v�f���烌�X�ԍ��𓾂�
{
 if (s.firstChild && s.firstChild.name!=null)
  return parseInt(s.firstChild.name.match(/[0-9]+/),10); // a�^�O��name�v�f���擾 (dat2html)
 else
  return parseInt(s.innerHTML.substr(0,5).match(/[0-9]+/),10); // ���X�ԍ����擾 (read.cgi)
}

function get_anchor(num) // �w�肵�����X�Ԃ̓��e��dt�v�f�𓾂�
{
 var l,v,d=0,res,s;
 if (num<1) return null; // �s���ȃ��X�Ԏw��
 l=document.getElementsByTagName('DT').length;
 if (l==0) return null; // DT�v�f������
 l<num-1 ? v=l-1 : v=num-1;
 for (;v>=0 && v<l;v+=d) {
  s=document.getElementsByTagName('DT')[v]; // v+1�Ԗڂ�dt�v�f���擾
  res=get_resnumfromdt(s);
  if (res==num) return s;
  if ((res>num && d==1) || (res<num && d==-1)) break; // �ړI�̃��X�Ԃ�����
  res>num ? d=-1 : d=1; // �����A�폜�Ȃǂ̗��R�ŖړI�̃��X�Ԃ����Ō�����Ȃ������ꍇ�͌�����܂ŌJ��Ԃ�
 }
 return null;
}

function get_cursor(e) // ���݂̈ʒu�𓾂�
{
 var a=new Array;
 if (document.all)
  a[0]=parseInt(event.x),a[1]=parseInt(event.y);
 else
  a[0]=parseInt(e.clientX),a[1]=parseInt(e.clientY);
 return a;
}

function control_multiplepopup(s) // ���d�|�b�v�A�b�v����
{
 if (pop.lev==0 || s==null) return null;
 var v,poplv;
 if (s.id.substr(0,3)=="pop")
  poplv=parseInt(s.id.substr(3,2),10);
 else  {
  var spn;
  if (s.parentElement) spn=s.parentElement; else spn=s.parentNode;
  if (spn.id.substr(0,3)=="pop") poplv=parseInt(spn.id.substr(3,2),10); else poplv=0;
 }
 if (pop.lev==1 && poplv==0) v=pop.lev+1; // �|�b�v�A�b�v���҂ɂ��Ȃ�
 if (pop.lev!=poplv) v=poplv+1; //  �|�b�v�A�b�v���҂ɂ��Ȃ�(�Ō�ɕ\���������C���[�ȊO����̃A���J�[�ɂ��|�b�v�A�b�v�̏ꍇ)
 if (v==null) return null;
 hide_popup(v);
 pop.lev=(pop.lev-1)*(pop.lev>0);
 return 1;
}

function edit_popuphtml(strnumarray) // �|�b�v�A�b�v���铊�e��ҏW����
{
 if (strnumarray=="") return;
 var numarray=strnumarray.split(" ");
 var i,idstr,popstr="",tnode;
 if (pop.lev+1<10) idstr="0"+String(pop.lev+1); else idstr=String(pop.lev+1);
 var bt="0px";
 if (document.getElementsByTagName("dd")[0].className.match(/^mg/)) bt="16px";
 for (i=0;numarray[i]!=null;i++) {
  tnode=get_anchor(parseInt(numarray[i])); // �w���̃��X�ԍ��̗v�f���擾����
  if (tnode==null) continue; // �w���̃��X�������ꍇ
  popstr+='<div id="pop'+idstr+'a" onmouseover="lay_mouseover(this)" onmouseout="lay_mouseout(this)">'+tnode.innerHTML+"<\/div>";
  popstr+='<div id="pop'+idstr+'b" style="margin:0px 0px '+bt+' 28px;" onmouseover="lay_mouseover(this)" onmouseout="lay_mouseout(this)">';
  popstr+=tnode.nextSibling.innerHTML+"<\/div>"; // tnode.nextSibling=<dd>���w��
 }
 return popstr;
}

function show_popup(d,ex,ey,popupkind) // �|�b�v�A�b�v�̕\�� popupkind=1:���X�A���J�[ 2:ID 4:��Q�� 10,11:���b�Z�[�W
{
 var x,y;
 var dbst=parseInt(Math.max(document.documentElement.scrollTop,document.body.scrollTop));
 var dbch=parseInt(Math.min(document.documentElement.clientHeight,document.body.clientHeight));
 var dbsl=parseInt(document.body.scrollLeft);
 var dbcw=parseInt(document.body.clientWidth);
 dbch+=(dbch==0)*document.body.clientHeight;
 if (window.innerHeight) dbch=window.innerHeight; // Netscape,Safari
 if (window.innerWidth) dbcw=window.innerWidth; 
 var ll=pop.lay[pop.lev];
 // �|�b�v�A�b�v����t���O�̏�����
 if (pop.timer.t!=null) clearTimeout(pop.timer.t);
 if (pop.timer.i!=null) clearTimeout(pop.timer.i);
 pop.timer.t=null , pop.timer.i=null;
 ll.innerHTML=d; // �{���̑�� 
 // �ʒu�C��
 if (popupkind==2) {
  // ID�|�b�v�A�b�v�̃N���b�N�ʒu�C��(�������C���[�̃��X�|�b�v�A�b�v�̈ʒu����ɂ��Ĉʒu���C������)
  pop.lev==1 ? ex=dbsl+70 : ex=parseInt(pop.lay[pop.lev-1].style.left,10)-dbsl+54;
  pop.lev==1 ? ey=ey+29   : ey=parseInt(pop.lay[pop.lev-1].style.top,10)-dbst+32;
 }
 ex+=12; // ���X�A���J�[��������悤�ɏC��
 // y���̐ݒ�
 var llch,llcw;
 if (_NN67)
  llch=ll.offsetHeight,llcw=ll.offsetWidth;
 else
  llch=ll.clientHeight,llcw=ll.clientWidth;
 if (pop.lev==1 || pop.dir.y==0) ey>dbch/2 ? pop.dir.y=-1 : pop.dir.y=1;
 if (popupkind==4 || popupkind==11) {
  pop.dir.y=1; // ��Q�ƃ��X�|�b�v�A�b�v�͏�ɉ�����
  ey+=6;
 }
 popupkind==10 ? ey+=6*pop.dir.y : ey=ey;
 if (pop.dir.y<0) {
  if (pop.lev>1 && ey-llch<0) pop.dir.y=0;
  ey-llch<0 ? y=dbst : y=dbst+ey-llch; // ��
 }
 else {
  if (pop.lev>1 && ey+llch>dbch) pop.dir.y=0;
  ey+llch>dbch ? y=dbst+dbch-llch-2 : y=dbst+ey; // ��
 }
 if (y<1) y=1;
 // x���̐ݒ�
 if (pop.lev==1 || pop.dir.x==0) pop.dir.x=1;
 if (pop.dir.x>0) {
  if (pop.lev>1 && llcw>dbcw-ex) pop.dir.x=-1;
  ex+llcw>dbcw ? x=dbcw-llcw-3 : x=ex; // �E
 }
 else {
  if (pop.lev>1 && ex-llcw<0) pop.dir.x=1;
  ex-llcw<0 ? x=0 : x=ex-llcw; // ��
 }
 if (x<1) x=1;
 // �����̐ݒ�
 var a=0;
 for (;;) {
  if (ll.style.overflow==null) break;
  if (_NN67) {
   ll.style.overflow="auto"; break;
  }
  // �c�͂ݏo������
  if (ll.offsetHeight>=dbch) a=1,y=dbst;
  if (ll.style.overflowY && !_NN67) ll.style.overflowY="visible"; else ll.style.overflow="visible";
  if (a==0) break;
  var llowIE=ll.offsetWidth;
  // �|�b�v�A�b�v���E�B���h�E����͂ݏo��ꍇ�̓X�N���[���o�[��ǉ����� 
  ll.style.height=String(dbch)+"px";
  if (window.opera) {
   ll.style.overflow="auto";
   // opera7,8��overflow="auto"�������Ȃ�
   if (_OP678) ll.style.overflow="visible";
   break;
  }
  if (ll.style.overflowY==null) {
   ll.style.overflow="scroll"; break;
  }
  ll.style.overflowY="scroll";
  if (document.all && !window.opera) ll.style.pixelWidth=llowIE+22; // IE��������
  break;
 }
 if (pop.opt.opa==1) {
  if (document.body.style.opacity!=null)
   ll.style.opacity = "0.95";
  else
   ll.style.filter="Alpha(opacity=95)";
 }
  ll.style.left=String(x)+"px";
 ll.style.top=String(y)+"px";
 ll.style.visibility="visible"; // �����ŕ\��
 pophideflag=0;
 // popupkind 1:���X 2:ID 3:���b�Z�[�W 4:��Q��
 pop.flg.cnt=(popupkind==2)*3+(popupkind==1)*2+(popupkind==4)*4;
 if (pop.flg.cnt==0) hide_popup(pop.lev,"delay"); // �����ɏ������b�Z�[�W�̏���
}

function hide_popup(l,d) // �|�b�v�A�b�v�̏���
{
 if (d=="delay")  {// �|�b�v�A�b�v��x��ď���
  pop.flg.touch=l-1;
  pop.flg.mout=pop.lev;
  if (pop.timer.t!=null) clearTimeout(pop.timer.t);
  pop.timer.t=setTimeout("event_timer()",700);
  return;
 }
 for (i=pop.max;i>=l;i-=1) {
  if (pop.lay[i].style.visibility=="hidden") continue;
  if (pop.lay[i].style.overflow!=null) pop.lay[i].style.overflowX="";
  pop.lay[i].innerHTML="";
  pop.lay[i].style.overflow="";
  pop.lay[i].style.overflowX="";
  pop.lay[i].style.overflowY="";
  pop.lay[i].style.width="";
  pop.lay[i].style.height="";
  pop.lay[i].style.visibility="hidden";
 }
 return;
}

function check_dtpos(s,ex) // ���t���̃C�x���g�̋N�����ʒu���m�F����
{
 pop.lay[0].innerHTML="<dl><dt>"+s.innerHTML+"<\/dt><dd>_<\/dd><\/dl>";
 var lx,v;
 if (pop.lay[0].clientWidth) v=pop.lay[0].clientWidth; else v=pop.lay[0].offsetWidth;
 pop.lay[0].innerHTML="";
 if (pop.lev==0) lx=parseInt(document.body.offsetLeft);
 else {
  var sl;
  if (pop.lev<10) sl="0"+String(pop.lev); else sl=String(pop.lev);
  lx=parseInt(document.getElementById("sty"+sl).style.left);
 }
 var ar=new Array;  // ar[0]:�|�b�v�A�b�v�̎�� ar[1]:���X�ԍ� ar[2]:�|�b�v�A�b�v�̈ʒu
 ar[0]=0;
 if (ex>=50+lx && ex<=v+lx) ar[0]=1; // ID�|�b�v�A�b�v
 if (ex<50+lx || (ex>v+lx && pop.opt.refskin30==1))�@ar[0]=2; // ��Q�ƃ��X�|�b�v�A�b�v
 // ���X�ԍ��擾
 if (s.firstChild!=null && s.firstChild.name!=null)
  ar[1]=parseInt(s.firstChild.name.match(/[0-9]{1,5}$/));
 else
  ar[1]=parseInt(s.innerHTML.match(/^[0-9]{1,5}/));
 ar[2]=lx+16;
 return ar;
}

function mbdtosbd(s) // �����ƈꕔ�L���̑S�p�����𔼊p�����ɕϊ�����
{
 var mbd=new String("�O�P�Q�R�S�T�U�V�W�X�{�|�C��");
 var sbd=new String("0123456789+-,>");
 var d=new String,c,p;
 for (p=0;p<s.length;p++) {
  c=mbd.indexOf(s.substr(p,1),0);
  if (c!=-1) d+=sbd.charAt(c); else d+=s.charAt(p);
 }
 return d;
}

function findrefres(res) // ���X�A���J�[���m�̊֌W���擾����
{
 if (pop.refs[0]!="done") {
  // ���ׂẴ��X�A���J�[���m�̊֌W���擾����
  var s=new Array,t=new Array;
  var r,lim,ss;
  lim=document.getElementsByTagName("DD").length;
  if (lim<1) return;
  for (r=0;r<lim;r++) {
   t[r]=document.getElementsByTagName("DT")[r];
  }
  for (r=0;r<lim;r++) {
   s[r]=document.getElementsByTagName("DD")[r].firstChild;
  }
  var prv,num,c,v;
  for (r=0;r<lim;r++) {
   for (ss=s[r];ss!=null;ss=ss.nextSibling) {
    if (ss.tagName!="A") continue;
    var anc=get_resnumfroma(ss);
    if (anc==null) continue;
    for (c=0;anc[c]!=null && c<lim;c++) {
     num=get_resnumfromdt(t[r]);
     v=parseInt(anc[c]);
     if (v>=num) continue; // �����ɑ΂��郌�X�w��͖���
     if (pop.refs[v]==null)
      pop.refs[v]=String(num);
     else {
      if (pop.refs[v].indexOf(String(num))!=-1) continue; // �������X�Ԃɑ΂��郌�X�A���J�[�͕����o�^���Ȃ�
      pop.refs[v]+=" "+String(num);
     }
    }
   }
  }
  pop.refs[0]="done";
 }
 var retval;
 if (pop.refs[res]=="") retval=null; else retval=pop.refs[res];
 return retval;
}

function findid(s) // ���t���N���b�N��ID���擾����
{
 var retval=new Array(2);
 var ss;
 if (pop.ids['idget']!="done") {
  // �S�Ă̓��e��ID���擾����
  var idstr;
  var sa=new Array;
  var i,l,num;
  l=document.getElementsByTagName("DT").length;
  if (l<1) return;
  for (i=0;i<l;i++) {
   sa[i]=document.getElementsByTagName("DT")[i];
  }
  for (i=0;i<l;i++) {
   ss=sa[i].innerHTML.match(/ID:([0-9A-Za-z\/\+\.\_]+)/);
   num=get_resnumfromdt(sa[i]);
   (ss==null) ? idstr="" : idstr=ss[1];
   if (idstr=="") continue;
   if (pop.ids[idstr]==null)
    pop.ids[idstr]=String(num);
   else
    pop.ids[idstr]+=" "+String(num);
  }
  pop.ids['idget']="done";
 }
 ss=s.innerHTML.match(/ID:([0-9A-Za-z\/\+\.\_]+)/);
 (ss==null) ? retval[0]="" : retval[0]=ss[1];
 retval[1]=pop.ids[retval[0]]; // retval[0]�Ɠ����ID�̏W���𓾂�
 if (retval[0]==null || retval[1]==null) retval[0]=null,retval[1]=null;
 return retval;
}

function grep3(evt,kind) // �X���b�h������ kind: ini=�t�H�[���̍쐬,move=�t�H�[���̈ړ�(�Œ�),resize=�E�B���h�E�̃T�C�Y���ύX,srh=�����{�^��,not=NG�{�^��
{
 var spn;
 if (kind=="ini") {
  spn=document.createElement("span");
  document.body.appendChild(spn);
 }
 else spn=document.getElementById("panel1");
 if (kind=="move") {
  // �����t�H�[���̌Œ�ƐڐG����(IE��p)
  if (event.x>parseInt(spn.style.left) && event.y<parseInt(spn.style.top)-parseInt(document.documentElement.scrollTop || document.body.scrollTop)+16+spn.offsetHeight) {
   event_mouseover(spn,"panel1");
   document.onmousemove="";
  }
  return;
 }
 if (kind=="ini" || kind=="resize") {
  // �����p�l���̔F���ʒu�Ƒ傫���̒���
  var dbow=parseInt(document.body.offsetWidth);
  var sh=parseInt(screen.height);
  var w=364; // ��
  var x=dbow-parseInt(w)+(document.all==null)*34-22; // ��
  var h=96;  // ����
  spn.style.left=x+"px";
  spn.style.width=w*(parseInt(w)>0)+"px";
  spn.style.height=h+"px";
  if (kind=="resize") return; // ���T�C�Y�̂�
  // �t�H�[���̏��������
  var frm="<form style=[text-align:right; height:10px; display:none;] onsubmit=[return false;] style=[height:5em;]>"+
    "<select name=[combo1] id=[selform] style=[width:7em;]>"+
    "<option value=[contents]>�{��<option value=[postinfo]>���e�ҏ��<\/select>"+
    "<input type=[text] id=[srhtxt] name=[pattern] onkeypress=[grep3(event,'srh')] style=[width:7em;]>"+
    "<input type=[button] value=[����] onclick=[grep3(0,'srh')] style=[width:3em;]>&thinsp;"+
    "<input type=[button] value=[�m�f] onclick=[grep3(0,'not')] style=[width:3em;]>&nbsp;<\/form>";
  spn.id="panel1";
  spn.innerHTML=frm.replace(/(\[|\])/g,"\"");
  if (document.all && !window.opera) {
   spn.style.cssText="position:expression('absolute');"+
    "top:expression((documentElement.scrollTop || document.body.scrollTop)+pop.pnl_y+'px');left:"+x+";"
  }
  else {
   spn.style.position="fixed";
   spn.style.top=pop.pnl_y+"px";
  }
  return;
 }
 // �X���b�h�̍i�荞��
 var pattern=document.getElementById("srhtxt").value;
 if (evt!=0) {
  // �e�L�X�g�ɃJ�[�\��������ꍇ��Enter�L�[���o
  if (document.all) k=window.event.keyCode; else k=evt.keyCode;
  if (k!=0x0D && k!=0x0A) return;
 }
 try
 {
  regex = new RegExp(pattern, "i");
  var dts = new Array , dds = new Array, exs = new Array , hide = new Array;
  var cnt=0;
  var l=document.getElementsByTagName('DT').length;
  if (document.body.innerText) {
   for (i=0;i<l;i++) {
    dts[i]=document.getElementsByTagName('DT')[i].innerText.replace(/\r/g,"");
   }
   for (i=0;i<l;i++) {
    dds[i]=document.getElementsByTagName('DT')[i].nextSibling.innerText.replace(/\r/g,"");
   }
  }
  else {
   for (i=0;i<l;i++) {
    dts[i]=document.getElementsByTagName('DT')[i].innerHTML.replace(/<br>/gi,"\n").replace(/<[^>]*>/gi,"");
   }
   for (i=0;i<l;i++) {
    dds[i]=document.getElementsByTagName('DT')[i].nextSibling.innerHTML.replace(/<br>/gi,"\n").replace(/<[^>]*>/gi,"");
   }
  }
  for (i=0;i<l;i++) {
   exs[i]=document.getElementsByTagName('DT')[i];
  }
  spos=0,cnt=0,spn=null;
  w=document.getElementById("selform").selectedIndex; // �R���{�{�b�N�X���猟���Ώۂ��擾
  for (i=0;i<l;i++) {
   get_resnumfromdt(exs[i]);
   // �����Ώۂ͓��e�ҏ�� or �{��
   spn=(w==0 && dds[i].match(regex))+(w==1 && dts[i].match(regex));
   spos=(spn && (cnt++==0))*i;
   hide[i]=(!spn && kind=="srh")+(spn && kind=="not");
  }
  // �����{�^�������������ꍇ�͊Y�����Ȃ����e���B���ANG�{�^���̏ꍇ�͊Y�����铊�e���B��
  for (i=0;i<l;i++) {
  dts[i]=document.getElementsByTagName('DT')[i];
  }
  for (i=0;i<l;i++) {
   if (hide[i]!=1) spn=""; else spn="none";
   dts[i].style.display = spn;
  }
  for (i=0;i<l;i++) {
  dds[i]=document.getElementsByTagName('DT')[i].nextSibling;
  }
  for (i=0;i<l;i++) {
   if (hide[i]!=1) spn=""; else spn="none";
   dds[i].style.display = spn;
  }
  window.scrollTo(0,get_anchor(spos+1).offsetTop);
  window.status="�� "+cnt+" / "+l+" ���̌�������"
 }
 catch (e)
 {
  window.status="�� ���K�\���ō\���G���[���������܂���";
 }
}

