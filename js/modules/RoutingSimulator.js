
var routing_simulator_vid;
var routing_simulator_quotes_img;
var routing_simulator_trades_img;

var dev_credit_img;
var three_d_consultant_img;
var design_consultant_img;
var tech_img;
var video_software_img;
var rip_img;

var credit_images = [];

function initializeRoutingSimulator(three_obj, auto_start) {

    if(auto_start) {
        setTimeout(function(){
            addRoutingSimulatorMeshes(three_obj)
            animateRoutingSimulator(three_obj)
            //rollCredits(three_obj)
        }, 3*1000)
    }

    // not used in this demo
    // add in button click handler for NxCoreCompression
    $("#RoutingSimulator").click(function() {
        addRoutingSimulatorMeshes(three_obj)
        animateRoutingSimulator(three_obj)
    });
}

function addRoutingSimulatorMeshes(three_obj) {
    video = document.createElement('video');
    video.width = 1920;
    video.height = 1080;
    video.autoplay = true;
    video.src = "./videos/RoutingSimulatorCombined.Trimmed.mp4";

    if(typeof video.loop == 'boolean'){
        video.loop = true;
    } else {
        video.addEventListener( 'ended', function ( event ) {
            video.currentTime = 0;
            video.play();// loop
        });
    }

    video_texture = new THREE.Texture(video);

    /* uncomment out for grid lines             */
    var i_material = new THREE.MeshBasicMaterial({
        map: video_texture
    });

    // pop this sucker into the marker labels so we can update the facing during rotation
    routing_simulator_vid =  new THREE.Mesh(new THREE.PlaneGeometry(1920, 1080), i_material);

    //alert(nx + ":" + ny + ":" + nz )
    routing_simulator_vid.position.x = 0; // move it over so the line isn't overlapping
    routing_simulator_vid.position.y = 0;
    routing_simulator_vid.position.z = -8000;

    three_obj.add(routing_simulator_vid);

    // add in quotes image panel
    var quotes_material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("./gifs/CQS_ms2_QpS.20080101.20120215.30m.1s.gif")
    });


    var img_pos_offset_x = 600;
    var img_pos_offset_y = 2000;
    var img_pos_offset_z = 750;

    // pop this sucker into the marker labels so we can update the facing during rotation
    routing_simulator_quotes_img =  new THREE.Mesh(new THREE.PlaneGeometry(410, 800), quotes_material);

    routing_simulator_quotes_img.position.x = -img_pos_offset_x; // shift it up and to the left for animation down
    routing_simulator_quotes_img.position.y = img_pos_offset_y;
    routing_simulator_quotes_img.position.z = -img_pos_offset_z;

    three_obj.add(routing_simulator_quotes_img);


    trades_material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("./gifs/CTA_ms2_TpS.20080101.20120216.30m.1s.4.gif")
    });

    // pop this sucker into the marker labels so we can update the facing during rotation
    routing_simulator_trades_img =  new THREE.Mesh(new THREE.PlaneGeometry(410, 800), trades_material);

    routing_simulator_trades_img.position.x = img_pos_offset_x; // shift it up and to the left for animation down
    routing_simulator_trades_img.position.y = img_pos_offset_y;
    routing_simulator_trades_img.position.z = -img_pos_offset_z;

    three_obj.add(routing_simulator_trades_img);
}

function animateRoutingSimulator(three_obj) {
    $("#menu").hide()

    var routing_simulator_sec_timeout = 3;
    var leave_time = (1*60)+10; //1:10

    // zoom to the middle of the screen
    new TWEEN.Tween(routing_simulator_vid.position )
        .to( {
            z: -1200
        }, 1000 )
        .easing( TWEEN.Easing.Exponential.Out).onComplete(function() {
            // let the video run through one time, cut out at 2:51
            setTimeout(function(){
                new TWEEN.Tween(routing_simulator_vid.position )
                    .to( {
                        z: -50000
                    }, routing_simulator_sec_timeout * 1000/3 )
                    .easing( TWEEN.Easing.Linear.None).onComplete(function() {
                    new TWEEN.Tween(routing_simulator_vid.position )
                        .to( {
                            z: -2160
                        }, routing_simulator_sec_timeout * 1000 )
                        .easing( TWEEN.Easing.Exponential.Out).onComplete(function() {

                            setTimeout(function(){
                                // after 1 min bring down the quotes
                                setTimeout(function(){
                                    new TWEEN.Tween( routing_simulator_quotes_img.position )
                                        .to( {
                                            y: 0
                                        }, routing_simulator_sec_timeout * 1000 )
                                        .easing( TWEEN.Easing.Exponential.Out).onComplete(function() {
                                            $("#OrdersPerSec").html("Orders")
                                        }).start();
                                }, 1000);

                                // after 8 sec bring down the trades (5 sec + 3 sec tween)
                                setTimeout(function(){
                                    new TWEEN.Tween( routing_simulator_trades_img.position )
                                        .to( {
                                            y: 0
                                        }, routing_simulator_sec_timeout * 1000 )
                                        .easing( TWEEN.Easing.Exponential.Out).onComplete(function() {
                                            $("#TradesPerSec").html("Trades")

                                            setTimeout(function(){

                                                new TWEEN.Tween( routing_simulator_quotes_img.position )
                                                    .to( {
                                                        y: -4000
                                                    }, routing_simulator_sec_timeout * 1000 )
                                                    .easing( TWEEN.Easing.Exponential.Out).onComplete(function() {
                                                        $("#OrdersPerSec").html("")

                                                    }).start();

                                                new TWEEN.Tween( routing_simulator_trades_img.position )
                                                    .to( {
                                                        y: -4000
                                                    }, routing_simulator_sec_timeout * 1000 )
                                                    .easing( TWEEN.Easing.Exponential.Out).onComplete(function() {
                                                        $("#TradesPerSec").html("")
                                                        new TWEEN.Tween(routing_simulator_vid.position )
                                                            .to( {
                                                                x: -750
                                                            }, routing_simulator_sec_timeout * 1000 )
                                                            .easing( TWEEN.Easing.Exponential.Out).onComplete(function() {
                                                                rollCredits(three_obj);
                                                            }).start();
                                                    }).start();
                                            }, leave_time*1000)
                                        }).start();
                                }, (10*1000)); //

                            }, 20*1000)

                        }).start();
                    }).start();
            }, ((2*60)+51)*1000);
        }).start();
}

function rollCredits(three_obj) {
    var start_y = -1000;
    var credits_z_offset = -1000;
    var credit_y_sep_value = 600;
    var credit_x_offset = 250;

    // add in quotes image panel
    var dev_credit_material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("./credits/Development.png")
    });

    var img_width        = 249;
    var img_height       = 125;

    var img_pos_offset_x = img_width/2+credit_x_offset;
    var img_pos_offset_y = start_y+(img_height/2);
    var img_pos_offset_z = credits_z_offset;

    // pop this sucker into the marker labels so we can update the facing during rotation
    dev_credit_img =  new THREE.Mesh(new THREE.PlaneGeometry(img_width, img_height), dev_credit_material);

    dev_credit_img.position.x = img_pos_offset_x; // shift it up and to the left for animation down
    dev_credit_img.position.y = img_pos_offset_y;
    dev_credit_img.position.z = img_pos_offset_z;

    credit_images.push(dev_credit_img)
    three_obj.add(dev_credit_img);

    // add in quotes image panel
    var three_d_consultant_material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("./credits/3DConsultants.png")
    });

    var img_width        = 561;
    var img_height       = 198;

    var img_pos_offset_x = img_width/2+credit_x_offset;
    var img_pos_offset_y = start_y-(credit_y_sep_value*1)+(img_height/2);
    var img_pos_offset_z = credits_z_offset;

    // pop this sucker into the marker labels so we can update the facing during rotation
    three_d_consultant_img =  new THREE.Mesh(new THREE.PlaneGeometry(img_width, img_height), three_d_consultant_material);

    three_d_consultant_img.position.x = img_pos_offset_x; // shift it up and to the left for animation down
    three_d_consultant_img.position.y = img_pos_offset_y;
    three_d_consultant_img.position.z = img_pos_offset_z;

    credit_images.push(three_d_consultant_img)
    three_obj.add(three_d_consultant_img);


    // add in quotes image panel
    var design_consultant_material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("./credits/DesignConsultants.png")
    });

    var img_width        = 441;
    var img_height       = 240;

    var img_pos_offset_x = img_width/2+credit_x_offset;
    var img_pos_offset_y = start_y-(credit_y_sep_value*2)+(img_height/2);
    var img_pos_offset_z = credits_z_offset;

    // pop this sucker into the marker labels so we can update the facing during rotation
    design_consultant_img =  new THREE.Mesh(new THREE.PlaneGeometry(img_width, img_height), design_consultant_material);

    design_consultant_img.position.x = img_pos_offset_x; // shift it up and to the left for animation down
    design_consultant_img.position.y = img_pos_offset_y;
    design_consultant_img.position.z = img_pos_offset_z;

    credit_images.push(design_consultant_img)
    three_obj.add(design_consultant_img);

    // add in quotes image panel
    var tech_material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("./credits/Technology.png")
    });

    var img_width        = 262;
    var img_height       = 218;

    var img_pos_offset_x = img_width/2+credit_x_offset;
    var img_pos_offset_y = start_y-(credit_y_sep_value*3)+(img_height/2);
    var img_pos_offset_z = credits_z_offset;

    // pop this sucker into the marker labels so we can update the facing during rotation
    tech_img =  new THREE.Mesh(new THREE.PlaneGeometry(img_width, img_height), tech_material);

    tech_img.position.x = img_pos_offset_x; // shift it up and to the left for animation down
    tech_img.position.y = img_pos_offset_y;
    tech_img.position.z = img_pos_offset_z;

    credit_images.push(tech_img)
    three_obj.add(tech_img);

    // add in quotes image panel
    var video_software_material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("./credits/VideoSoftware.png")
    });

    var img_width        = 270;
    var img_height       = 157;

    var img_pos_offset_x = img_width/2+credit_x_offset;
    var img_pos_offset_y = start_y-(credit_y_sep_value*4)+(img_height/2);
    var img_pos_offset_z = credits_z_offset;

    // pop this sucker into the marker labels so we can update the facing during rotation
    video_software_img =  new THREE.Mesh(new THREE.PlaneGeometry(img_width, img_height), video_software_material);

    video_software_img.position.x = img_pos_offset_x; // shift it up and to the left for animation down
    video_software_img.position.y = img_pos_offset_y;
    video_software_img.position.z = img_pos_offset_z;

    credit_images.push(video_software_img)
    three_obj.add(video_software_img);


    // add in rip image panel
    var video_software_material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("./credits/R.I.P.png")
    });

    var img_width        = 356;
    var img_height       = 145;

    var img_pos_offset_x = img_width/2+credit_x_offset;
    var img_pos_offset_y = start_y-(credit_y_sep_value*5)+(img_height/2);
    var img_pos_offset_z = credits_z_offset;

    // pop this sucker into the marker labels so we can update the facing during rotation
    rip_img =  new THREE.Mesh(new THREE.PlaneGeometry(img_width, img_height), video_software_material);

    rip_img.position.x = img_pos_offset_x; // shift it up and to the left for animation down
    rip_img.position.y = img_pos_offset_y;
    rip_img.position.z = img_pos_offset_z;

    credit_images.push(rip_img)
    three_obj.add(rip_img);

    // roll em
    for(var i = 0; i < credit_images.length; i++) {
        new TWEEN.Tween( credit_images[i].position )
            .to( {
                y: credit_images[i].position.y + (credit_y_sep_value*5) + (start_y*-1)
            }, 40 * 1000 )
            .easing( TWEEN.Easing.Linear.None).onComplete(function() {

        }).start();
    }
}