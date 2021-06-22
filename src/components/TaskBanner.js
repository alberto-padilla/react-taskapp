import React from "react";

export const TaskBanner = props => (
    <h4 className="bg-primary text-white text-center p-4">
        {props.userName}'s Task App ({props.taskItemsLength} task to do)
    </h4>
)
