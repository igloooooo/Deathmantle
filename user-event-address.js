/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define(['N/record','N/https', 'N/http'],
    function(record, https, http) {
        function beforeLoad(context) {
            //========add your before load logic here ==========

           //Sample allow only create type

  }
        function beforeSubmit(context) {
            //======add your before submit logic here============

  }
        function afterSubmit(context) {
            //===========add you after submit logic here ======
            var newId =  context.newRecord.id;
 			var newType = context.newRecord.type;
 			log.debug('<After Submit Script> type:'+context.type+', RecordType: '+newType+', Id:'+newId);
          	var response = http.post({
    			url: 'http://144.140.229.53:46908/poc',
              	body: {'id': newId}
			});
  }
        return {
            beforeLoad: beforeLoad,
            beforeSubmit: beforeSubmit,
            afterSubmit: afterSubmit
        };
    });