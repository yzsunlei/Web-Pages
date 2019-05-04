//XMLHttpRequest�������� �������ݵĸ�ʽ 
//xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//url���ļ�λ��
//data������	ͨ��js pingһ��a=xxx&b=xx....
//method������ʽ
//type :method 
//dataType:��������		
/*
 С�᣺ ����json��ʽ��php����ַ�����ajax���շ��ص�responseText��
	Ȼ��eval��php json_encode ���������ô����string��
	Ŀǰ��õİ취�ǣ�php��� [{a:xxx,b:sss,...}]	��ʽ���ַ��� ��Ȼ�� ajax eval ȡ�õ��������0��
	
*/
//contentType�����ݱ���
//datafilter�����ݹ���
//cache��

//js��һ�г�������Ϊ��php���صĲ��� json��ʽ�����eval��������
//ie6 error
function ajax(json,fnSucc,fnFaild)
{
	//Ĭ��ֵ
	var info={'url':null,'data':'','method':'GET','dataType':'text','async':true};

	for(var attr='' in json)
	{
		info[attr]=json[attr];
		//console.log(info[attr]);
	};
	//���ݻ�ȡ���

	if(info['url']==null)
	{
		console.log('url is null !');
		return false;
	}
	/* else
		console.log('avivaled?'); û��*/
		
	var xmlhttp=null;
	/*
	if (window.XMLHttpRequest)// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	else	// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	*/
	try
	{
		xmlHttp=new XMLHttpRequest();
	}
	catch(e)
	{
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	//����XHR�������

	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4)
		{
			if(xmlhttp.status==200)
			{
				switch(info['dataType'].toUpperCase())
				{	//��������ֻ��responseText ��responseXML ����
					//text��XML��html��script��json
					case 'XML':fnSucc(xmlhttp.responseXML);break;
					case 'JSON':fnSucc(eval(xmlhttp.responseText));break;
					default:fnSucc(xmlhttp.responseText);break;
				};
			}
			else
			{
				if(fnFaild)
					fnFaild();
			}
		}
	}
	//�ص��������

	if(info['method'].toUpperCase()=='GET')
	{
		xmlhttp.open("GET",info['url'],true);
		xmlhttp.send();
	}
	else
	{
		xmlhttp.open('POST',info['url'],true);
		//xmlhttp.setrequestheader("content-length",100);//post�ύ������
		xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");//post�ύ������
		xmlhttp.send('con=xxx&a=bb');//? '{a:sss,b:xxx...}' �������������ݣ�Ȼ��php�� json_incode()
	}
	//���ݷ������

}
/*	���ò�ƴ���ĸ��� try catch ��Ӧ�Ա������ö�������Ϊ��Щ�����ֱ�ӵ��¿��� ���� ��ʱ������if�ж�
	����ʹ�ÿ϶�Ҫ����try catch������ ����ʱ�� if ��
function ajax_init()
{
	var ajax=false;
	try 
	{
		ajax = new ActiveXObject("Msxml2.XMLHTTP");
	} 
	catch (e) 
	{
		try 
		{
			ajax = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (E) 
		{
			ajax = false;
		}
	}
	if (!ajax && typeof XMLHttpRequest!='undefined') 
	{
		ajax = new XMLHttpRequest();
	}
	return ajax;
} 
*/