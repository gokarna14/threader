import React from "react";

const UserResponse=(props)=>{




    return(
        <div>
            <i>Please tell us which of the following would be best for sentiment
                for your statement.
            </i>
            <div className="niceCenter">
                <select className="form-select form-select"
                onChange={(e)=>{
                    props.setUserResponse(e.target.value)
                }}
                >
                <option value="0">-- SELECT --</option>
                    <option value="1">JOY 😁</option>
                    <option value="2">ANGER 😡</option>
                    <option value="3">SADNESS 😭</option>
                    <option value="4">FEAR 😨</option>
                    <option value="5">SURPRISE 😦</option>
                    <option value="0">None of above ❌ </option>
                </select>
            </div>
        </div>
    )
}

export default UserResponse;