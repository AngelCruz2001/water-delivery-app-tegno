import { create } from "zustand";
import { PersmissionStatus } from "../../interfaces/permissions";
import { checkLocationPermission, requestLocationPermission } from "../../actions/permissions/location";


type PermissionState = {
    locationStatus: PersmissionStatus;

    // Methods
    requestLocationPermission: () => Promise<PersmissionStatus>
    checkLocationPermission: () => Promise<PersmissionStatus>
}



export const usePermissionStore = create<PermissionState>()(set => ({
    locationStatus: 'undetermined',

    requestLocationPermission: async () => {
        const status = await requestLocationPermission();
        set({ locationStatus: status })
        return status;
    },
    checkLocationPermission: async () => {
        const status = await checkLocationPermission();
        set({ locationStatus: status })
        return status;
    }
}))