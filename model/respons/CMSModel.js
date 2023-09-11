
/**
 * @description constructor data cell
 */

class CMSModel {
    constructor(data) {
        this.msg_count = data.msg_count;
        this.frame_name = data.frame_name;
        this.cms_code = data.cms_code;
        this.base_code = data.base_code;
        this.mcu_code = data.mcu_code;
        this.site_location = data.site_location;
        this.bid = data.bid;
        this.vcell = data.vcell;
        this.temp = data.temp;
        this.pack = data.pack;
        this.wake_status = data.wake_status;
        this.door_status = data.door_status;
    }
}

export default CMSModel;