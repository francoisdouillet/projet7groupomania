import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"

const Signupcomp = () => {
  return (
    <div className="signup">
      <form className="signup__form">
        <TextField id="outlined-basic" color="secondary" label="Username" variant="outlined" required type="text"/>
        <TextField id="outlined-basic" color="secondary" label="Email" variant="outlined" required type="email"/>
        <TextField id="outlined-basic" color="secondary" label="Password" variant="outlined" required type="password" />
        <Button variant="contained" color="secondary">S'inscrire</Button>
      </form>
    </div>
  );
};

export default Signupcomp;
