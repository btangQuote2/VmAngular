import { BaseClass } from '../BaseClass';

export class TenantPermissions extends BaseClass {
    public Settings: boolean;

    constructor (json: any) {

        super();
        this.fromObject(json);
    }
}

export class UserPermissions extends BaseClass {
    public Create: boolean;
    public Update: boolean;
    public Delete: boolean;

    constructor (json: any) {

        super();
        this.fromObject(json);
    }
}

export class IdentityPermissions {
    public Tenant: TenantPermissions;
    public User: UserPermissions;

    constructor (json) {

        for (const propName in json) {

            if (propName === 'Tenant') {

                this[propName] = new TenantPermissions(json[propName]);
            } else if (propName === 'User') {

                this[propName] = new UserPermissions(json[propName]);
            }
        }
    }
}

export class TimeRecordsPermissions extends BaseClass {
    public Read: boolean;
    public ReadOthers: boolean;
    public Create: boolean;
    public CreateOthers: boolean;
    public Update: boolean;
    public UpdateOthers: boolean;
    public Delete: boolean;
    public DeleteOthers: boolean;
    public Approve: boolean;
    public Sign: boolean;
    public Export: boolean;
    public Reject: boolean;
    public ReadComments: boolean;
    public DeleteComments: boolean;
    public ReadSettings: boolean;
    public UpdateSettings: boolean;

    constructor (json: any) {

        super();
        this.fromObject(json);
    }
}

export class ProjectPermissions extends BaseClass {
    public Read: boolean;
    public CanManage: boolean;

    constructor (json: any) {

        super();
        this.fromObject(json);
    }
}

export class CostCodePermissions extends BaseClass {
    public Read: boolean;

    constructor (json: any) {

        super();
        this.fromObject(json);
    }
}

export class DataSyncsPermissions extends BaseClass {
    public Register: boolean;
    public Read: boolean;
    public ReceiveTimeRecordNotifications: boolean;

    constructor (json: any) {

        super();
        this.fromObject(json);
    }
}

export class Permissions {
    public Identity: IdentityPermissions;
    public TimeRecords: TimeRecordsPermissions;
    public Projects: ProjectPermissions;
    public CostCodes: CostCodePermissions;
    public DataSyncs: DataSyncsPermissions;

    constructor (json) {

        // console.log('Permissions constructor', json);
        for (const propName in json) {

            if (propName === 'Identity') {

                this[propName] = new IdentityPermissions(json[propName]);
            } else if (propName === 'TimeRecords') {

                this[propName] = new TimeRecordsPermissions(json[propName]);
            } else if (propName === 'Projects') {

                this[propName] = new ProjectPermissions(json[propName]);
            } else if (propName === 'CostCodes') {

                this[propName] = new CostCodePermissions(json[propName]);
            } else if (propName === 'DataSyncs') {

                this[propName] = new DataSyncsPermissions(json[propName]);
            }
        }
    }
}
