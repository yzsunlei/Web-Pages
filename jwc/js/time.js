function time2str(otimeObj)
{
	var today = otimeObj;
	var weekdays = ['��','һ','��','��','��','��','��'];
	var weeks = today.getDay();     // ���� 0 (������) �� 6 (������)
	var month = today.getMonth()+1;
	return today.getFullYear() + "��" + month + "��" + today.getDate() + "��&nbsp;&nbsp;" + "����" + weekdays[weeks] +'&nbsp;&nbsp;';
}
//��ȡʱ��Ҫ����ҳ����ʾ��λ��
var oshow = document.getElementById('time');

//�������벿��
	//���ÿ�ѧ��һ��
	var NewTermDate = new Date(2014,9-1,1);
	var endDate = new Date(2015,2-1,1)
	
//�������Զ����㲿��
	//һ�������
	var oneDayMs = 3600000*24;
	//��������޸�
	var nDay = 0;
	//��ѧ��N��
	var Nweekth = 0;
	//��ѧ��N���ַ���
	var weekthStr = '';
	
	//��ȡ���������
	var today0 = new Date();
	//ֱ��new Date �����
	var today = new Date(today0.getFullYear(),today0.getMonth(),today0.getDate());
	//�����������
	switch(NewTermDate.getDay())
	{
		case 0:nDay=6;break;
		case 1:nDay=0;break;
		case 2:nDay=1;break;
		case 3:nDay=2;break;
		case 4:nDay=3;break;
		case 5:nDay=4;break;
		case 6:nDay=5;break;
		default:break;
	}
	Nweekth = Math.ceil(((today.getTime()-NewTermDate.getTime())/oneDayMs+1+nDay)/7);
	
	//���� �ڼ��� �Ƿ���ʾ
	if(today.getTime()>= NewTermDate.getTime())
		Nweekth = '<font style="color:#c00">��'+Nweekth+"��</font>";
	//��ʾʱ��
	oshow.innerHTML = time2str(today)+Nweekth;
	
	
	
	
	
	
	
	
	
	