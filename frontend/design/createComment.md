## Plan 

### Structure 

> 1. A new component, 'create comment'
> 2. This component is 'called upon' in the post component
> 3. This Sits inside a container that contains:
  * n likes     Add a comment    n comments 
> 4. When you click add comment button (or n comments button):
>1.   Opens the comments container (even if 0 comments)   
>2.   Populates the container with a form at the top of the comment box

States:

-1 Comment input
const [commentInput, setCommentInput] = useState("");
it does: sets input field value to whatevers being typed

-2

2 states for comment box being triggered

1 - a post with comments 

  comment input form is rendered above all comments

2 - a post with no comments 

  > useEffect for displaying comment box is set to not display 
  > we need to trigger our useEffect to trigger and display the comment box
  >  comment input form is rendered



Functions:

  const handleCommentInput = (event) => {
    setCommentInput(event.target.value);
  };