// Andrew Barlow
// https://www.e-education.psu.edu/meteo469/node/137
// a simple climate model


export class EBM {

    constructor() {

        // CONSTANTS/GIVEN //////////////////////////////////////////////////

        // S: Solar Constant (W/m^2)
        this.s = 1367;

        // alpha: earth's albedo aka reflectivity
        this.alpha = 0.3;

        // r: earth's radius
        this.r = 6.371 * 10e6;

        // sigma: Stephan-Boltzman constant, no units
        this.sigma = 5.67 * 10e-8;

        // epsilon: emissivity; fractional val, no units
        this.epsilon = 0.612;

        // C: earth's effective heat capacity
        this.c = 2.08 * 10e8;

        this.a = 315; // Wm^-2
        this.b = 4.6; //Wm^-2K^-1

        

    }

    blackBodyRadiation() {
        let answer = this.epsilon * this.sigma * Math.pow(this.T(), 4);
        if (isNaN(answer)){
            console.error("error: NaN");
        }
        else{
            return answer;
        }
    }

    incomingRadiation() {
        let answer = ((1-this.alpha) * this.s) / 4;
        if (isNaN(answer)){
            console.error("error: NaN");
        }
        else{
            return answer;
        }
    }

    temperature() {
        let answer = Math.pow(this.incomingRadiation() / (this.epsilon * this.sigma), 1/4) ;
        if (isNaN(answer)){
            console.error("error: NaN");
        }
        else{
            return answer;
        }
    }


}
