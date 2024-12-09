import { EntityMetadataMap } from "@ngrx/data";

export const entityMetadata: EntityMetadataMap = {
    Product: {
        entityDispatcherOptions: {
            optimisticUpdate: true,
            optimisticDelete: false
        }
    },
    Cart: {
        entityDispatcherOptions: {
            optimisticUpdate: true,
            optimisticDelete: false
        },
        selectId: (user) => user.ids
    },
};

export const entityConfig = {
    entityMetadata
}