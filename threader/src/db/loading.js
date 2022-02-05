export const loading = (text)=>{
return(
    <button class="btn btn-danger" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only"> {text}</span>             
    </button>
)
}

export const loadingSpinners =()=>{
    return(
        <span class="spinner-border text-danger" role="status">
        </span>
    )
}

export const loadingBubble =()=>{
    return(
        <span class="spinner-grow text-danger" role="status">
        </span>
    )
}