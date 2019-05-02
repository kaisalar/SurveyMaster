class A{
    static f(){ 
        console.log("f()");
    }
    static f1(){
        this.f();
    }
}
A.f1();