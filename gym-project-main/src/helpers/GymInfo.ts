export class GymInfo {
    gym_name: string;
    created_on: string;
    open_time: string;
    close_time: string;
    manager_name: string;
    manager_email: string;
    is_open: boolean;
    city: string;

    constructor(
        gym_name: string,
        created_on: string,
        open_time: string,
        close_time: string,
        manager_name: string,
        manager_email: string,
        is_open: boolean,
        city: string
    ) {
        this.gym_name = gym_name;
        this.created_on = created_on;
        this.open_time = open_time;
        this.close_time = close_time;
        this.manager_name = manager_name;
        this.manager_email = manager_email;
        this.is_open = is_open;
        this.city = city;
    }

    static from_json(json: any): GymInfo {
        return new GymInfo(
            json.gym_name,
            json.created_on,
            json.open_time,
            json.close_time,
            json.manager_name,
            json.manager_email,
            json.is_open,
            json.city
        );
    }

    to_json(): any {
        return {
            gym_name: this.gym_name,
            created_on: this.created_on,
            open_time: this.open_time,
            close_time: this.close_time,
            manager_name: this.manager_name,
            manager_email: this.manager_email,
            is_open: this.is_open,
            city: this.city
        };
    }
}