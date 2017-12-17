/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/error', 'N/http', 'N/https', 'N/record'],
/**
 * @param {error} error
 * @param {http} http
 * @param {https} https
 */
function(error, http, https, r) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(scriptContext) {
    	if (scriptContext.type !== scriptContext.UserEventType.CREATE) {
    		return;
    	}
            
        var customerRecord = scriptContext.newRecord;
        log.debug('details', customerRecord);
        var newId = customerRecord.id;
      	var stringJson = JSON.stringify(customerRecord);
      	var rawRecord = JSON.parse(stringJson);
        var recordfields = rawRecord.fields;
        log.debug('recordfields', recordfields);
        
        var customer = r.load({
            type: r.Type.CUSTOMER,
            id: recordfields.custrecord_wrm_reg_customer,
            isDynamic: false,
            defaultValues: null
        });
        var customer_external_id = customer.getValue({
            fieldId: "entityid"
        });
        log.debug(customer);
        var end_customer = r.load({
            type: r.Type.CUSTOMER,
            id: recordfields.custrecord_customer_end_user,
            isDynamic: false,
            defaultValues: null
        });
        var end_customer_external_id = customer.getValue({
            fieldId: "entityid"
        });
        var body = {
                "Warranty_Registration": [{
                "ID": newId,
                "Customer_End User_Internal_Id": recordfields.custrecord_customer_end_user,
                "Customer_Internal_Id": recordfields.custrecord_wrm_reg_customer,
                "Customer_End User_External_Id": end_customer_external_id,
                "Customer_External_Id": customer_external_id,
                "Status": recordfields.custrecord_wrm_reg_status,
                "Invoice_No": recordfields.custrecord_wrm_reg_ref_invoice,
                "Item": recordfields.custrecord_wrm_reg_item,
                "Quantity": recordfields.custrecord_wrm_reg_quantity,
                "Units": recordfields.custrecord_wrm_reg_uom,
                "Serial_Lot Number": recordfields.custrecord_wrm_reg_ref_seriallot,
                "Invoice_Date": recordfields.custrecord_wrm_reg_invoicedate,
                "Ship_to_Address": recordfields.custrecord_wrm_reg_shiptoaddress,
                "Warranty_Expiration": recordfields.custrecord_wrm_reg_warrantyexpire
              }]};
        log.debug('body', body);
        var header=[];
        header['Content-Type']='application/json';
        var response = http.post({
			url: 'http://144.140.229.53:46908/warranty',
			headers:header,
          	body: JSON.stringify(body)
		});
    	log.debug('details', response);
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
