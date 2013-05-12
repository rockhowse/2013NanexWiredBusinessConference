

/**
 * Dogbert
 * Nanex LLC.
 * 4/13/2013
 *
 * Use the code for whatever, please acknowledge
 * Nanex LLC if you use it as a derivative work.
 *
 */

// arrays containing year data, and functions needed to render the DataVolume Visualization
var months_arr = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
var totals_real_arr     = [96.49152334, 259.06450852, 283.70680616, 319.85248806, 293.73167374, 316.45024358, 402.39630238, 343.10933612, 370.45639542, 446.37960004, 423.43060012, 560.67479656, 534.39900764, 597.95833048, 480.45648122, 660.68171836, 647.6771803, 683.6091968, 828.33728454, 793.49448362, 853.34651138, 976.3202117, 960.33593102, 1191.90244842, 1332.5426105, 1109.60513558, 1137.57406072, 1186.38146732, 1353.70192516, 1579.80983102, 2035.33967486, 1685.49012348, 1618.15980966, 1810.45784226, 1833.75313334, 2175.13223902, 2099.60988558, 2559.99785362, 2838.25032308, 2379.98533926, 2308.62370158, 2346.43955784, 2557.9336719, 2626.1012978, 2294.80001372, 2499.40914118, 2157.07040066, 3179.58384294, 2076.63232532, 2901.67537406, 3394.07328156, 3581.37612692, 5553.21574038, 3420.65639642, 4691.3157587, 6432.18051948, 4759.37736508, 7645.7523538, 6776.83400294, 7072.561797, 6050.35655082, 6238.79305324, 6500.43918836, 8988.58745902, 6481.70677566, 8408.20109176, 11978.73970698, 10133.09075288, 7652.25687412, 7331.9338947, 7200.36559034, 8152.71319438, 7965.0028785, 7499.62062256, 6334.97054968, 5971.30385932, 5707.86938128, 5974.90150726, 7603.40825722, 6159.93595044, 5723.67458118, 6495.70662054, 6245.51303438, 5507.6399386, 6111.60780214, 10841.8249215, 10366.24152714, 10200.10302356, 8067.63296756, 7415.30177936, 8555.15476898, 8096.52857092, 7245.86390228, 8681.18889076, 8368.25783088, 12273.48599784, 9052.68229798, 11511.98841312, 12402.92207204, 10915.37341818, 21412.94260496, 17447.16409834, 18051.68557776, 13891.94824782, 9939.7717192, 8192.52778948, 8670.66497934, 10256.20072034, 9525.9268524, 11607.60917072, 10990.38128038, 8938.21240794, 9168.38668964, 9221.19329126, 10415.8068754, 11489.68788238, 8828.21211444, 9242.80543782, 9490.08867546, 10642.37495752]
var trades_real_arr     = [26.80320092, 71.96236346, 78.80744614, 84.17170738, 73.43291842, 79.11256088, 95.80864342, 83.68520392, 90.35521838, 114.4563077, 100.81680954, 114.42342786, 113.7019165, 114.99198662, 98.0523431, 122.34846636, 109.77579326, 117.86365462, 156.29005368, 161.9376497, 174.15234926, 195.26404234, 171.4885591, 212.83972292, 233.77940534, 201.74638828, 206.8316474, 219.70027172, 250.68554168, 292.5573761, 363.45351336, 312.12780064, 299.659224, 329.17415312, 316.16433332, 381.60214718, 349.93498092, 387.87846266, 394.20143376, 339.9979056, 339.50348552, 355.52114512, 387.56570786, 410.32832778, 449.960787, 499.88182822, 371.90868976, 496.80997544, 269.69250978, 341.3735734, 361.07162568, 385.09420718, 590.76763194, 393.17889614, 509.92562594, 624.48354558, 485.65075152, 688.80651836, 564.7361669, 620.40015762, 650.5759732, 725.4410527, 792.73648638, 1070.06993558, 852.85615468, 1025.39037704, 1130.06978366, 955.9519578, 757.64919544, 771.78251522, 679.27977266, 754.88085132, 788.61414638, 757.53743662, 633.49705496, 635.2450914, 582.43565114, 671.337248, 783.85652136, 628.5648929, 665.54355594, 738.1484796, 618.36762716, 633.0620619, 719.0126826, 951.0372738, 779.41665616, 790.70566074, 689.54127926, 706.21921708, 757.09334238, 729.41698836, 746.99627858, 859.52365254, 820.4174344, 1067.25965198, 983.9872063, 975.5922384, 976.60803716, 873.22987344, 1408.746224, 1090.44775614, 1172.18737516, 807.67140974, 676.17494688, 671.51867126, 753.97086776, 861.86560674, 768.21990744, 1084.82328698, 964.06853336, 876.2953341, 935.5496622, 970.65192538, 1001.51989186, 1094.25598878, 882.82121144, 1062.39142962, 1054.45429726, 1097.15205746]
var trades_twenty_arr   = ['118,295,599,800', '356,068,393,060', '666,984,403,440', '989,812,156,100', '1,253,460,780,800', '1,607,463,609,760', '1,988,691,921,940', '2,333,712,459,620', '2,700,904,690,620', '3,132,277,117,580', '3,574,574,416,400', '4,163,364,146,360', '4,683,714,797,420', '5,272,757,414,720', '5,784,177,070,060', '6,390,095,191,580', '7,099,487,022,300', '7,788,080,474,040', '8,583,989,576,520', '9,419,918,603,440', '10,220,407,465,100', '11,266,791,128,840', '12,245,061,359,740', '13,434,665,854,580', '14,657,738,288,080', '15,866,216,860,480', '17,006,074,996,460', '18,146,086,585,580', '19,609,643,288,100', '21,100,334,102,360', '23,244,125,231,300', '24,910,865,274,480', '26,363,875,147,320', '28,382,401,889,420', '30,189,438,047,480', '32,276,478,384,880', '34,393,134,325,840', '37,098,927,750,500', '39,775,338,752,280', '42,263,210,852,560', '44,521,697,769,660', '46,716,342,980,400', '49,567,734,903,800', '52,183,060,925,680', '54,195,168,035,740', '56,954,077,425,960', '59,227,137,070,180', '62,031,346,589,860', '64,373,195,939,000', '67,260,758,607,020', '70,403,839,253,420', '74,595,305,663,360', '79,702,173,314,000', '83,128,282,522,000', '88,238,419,865,620', '94,374,888,894,160', '99,000,425,749,520', '107,262,554,083,940', '113,577,250,887,100', '120,896,595,224,700', '127,022,662,277,080', '132,626,910,138,080', '139,911,065,964,560', '148,843,123,860,080', '154,603,988,508,000', '163,687,293,578,540', '175,485,040,302,140', '185,504,802,204,260', '192,975,585,090,420', '200,102,648,490,480', '207,302,813,124,740', '216,208,339,596,140', '224,084,567,549,460', '231,241,873,158,600', '237,744,910,592,140', '243,522,333,150,740', '249,593,253,558,020', '255,671,504,826,920', '262,512,837,185,200', '269,243,034,187,960', '274,555,676,063,900', '281,224,533,628,480', '287,388,774,169,240', '293,145,838,747,360', '299,143,264,945,700', '310,146,882,131,560', '321,072,408,150,780', '330,165,007,788,080', '339,068,944,936,040', '346,563,697,660,900', '354,576,447,202,720', '363,136,647,960,080', '369,727,041,087,340', '379,154,456,229,120', '387,621,804,687,720', '399,626,895,194,040', '407,923,687,463,580', '420,390,615,337,960', '432,688,902,591,660', '443,524,032,997,340', '465,630,824,468,800', '482,587,547,640,700', '501,329,778,378,060', '514,503,814,133,720', '523,494,587,310,060', '532,590,937,691,060', '541,484,813,412,840', '550,616,056,281,440', '560,898,719,512,780', '572,952,424,256,020', '582,740,325,978,160', '592,767,080,702,040', '601,344,293,794,860', '610,607,080,871,600', '621,453,012,363,220', '632,423,059,974,880', '641,412,138,531,340', '650,979,877,589,000', '660,751,574,176,140', '670,175,947,943,640']

// Create objects
var data_volume_objs  = []; // all data volumen objects
var trade_objs        = []; // recs for trade_objs
var quote_objs        = []; // recs for all data
var wire_objs         = []; //non-resized components
var year_objs         = []; // years display
var month_objs        = []; // month display
var marker_objs        = []; // used for markers

// main container for data volume
var data_volume_container;
var rotate_data_volume = false;

var cur_year = 2003;
var bar_scale_factor = 10;
var num_slide = 0;
var z_fits_it_sits =  -3550;// home z position after starmap animation
var compress_time = 10;

function createDataVolumeRectangle(three_obj, row, col, xOffset, yOffset, zOffset, cube_height, inc_material, year, month, print_year) {
    var geometry = new THREE.CubeGeometry( 35, cube_height, 35);
    var obj = new THREE.Mesh( geometry, inc_material );

    // Calculate x position
    var width = geometry.width; // Object width
    var spaceWidth = 0; // Space between objects
    var totalWidth = (width * 6) + (spaceWidth*12); // Total width of objects plus spaces
    obj.position.x = (col * width) + // Add obj widths
        (width / 2) + xOffset; // Offset half object width

    // Calculate y position
    var height = geometry.height; // Object height
    var spaceHeight = text_col_width;
    var totalHeight = (height * 3) + (spaceHeight * 4); // Total height of objects plus spaces
    obj.position.y += yOffset + (cube_height / 2);

    // add caption to data bar
    if(print_year){
        addTextToScene(three_obj, year, [obj.position.x+(text_col_width/3), -80, 0], 250, 125, "100px")
    }

    if(month != ""){
        //addTextToScene(three_obj, month, [obj.position.x, 20, 0], 32, 125, "16px")
    }

    //offset of y if needed
    /* + // Offset from center 0
     (row * height) + // Add object height
     ((row + 1) * spaceHeight) + // Add object spaces
     (height / 2) + yOffset; // Offset half object height
     */

    // Calculate z position
    /*
     var spaceClose = 10;
     var totalClose = (width * 3) + (spaceClose * 4); // Total height of objects plus spaces
     obj.position.z  = -(totalClose / 2) + // Offset from center 0
     (row * width) + // Add object height
     ((row + 1) * spaceClose) + // Add object spaces
     (width / 2) + zOffset; // Offset half object height
     */

    return obj;
}

function initializeDataVolume(scene, auto_run) {

    // add in black plane to hide the point clouds
    /*var hide_plane_material = new THREE.MeshBasicMaterial({ color: 0x00000} );
    var hide_plane_geometry = new THREE.PlaneGeometry(30000, 30000);
    var hide_plane = new THREE.Mesh( hide_plane_geometry, hide_plane_material );
    hide_plane.position.z = -1000; // move it back
    scene.add(hide_plane)
    */

    // add in black plane to hide the point clouds
    var hide_plane_back_material = new THREE.MeshBasicMaterial({ color: 0x000000} );
    var hide_plane_back_geometry = new THREE.PlaneGeometry(1000000, 1000000);
    var hide_plane_back = new THREE.Mesh( hide_plane_back_geometry, hide_plane_back_material );
    hide_plane_back.position.z = -75000; // move it back
    //scene.add(hide_plane_back)

    // have to create container for easy manipulation instead of trying to move the camera
    var container_material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, wireframe_linewidth: 1 } );
    var container_geometry = new THREE.CubeGeometry( 10000, 10000, 10000);
    data_volume_container = new THREE.Mesh( container_geometry, container_material );

    // add in the volume rectangles
    for (var q = 0; q < months_arr.length; q++) {
        var row =  Math.floor(q/3)-3;
        var col = q;
        // putting into rows q%3;

        var x_offset = -500

        var trade_color = 0xD4C763
        // first one is number of trade_objs
/*
        var trades_material = new THREE.MeshBasicMaterial( { color: trade_color } );
        var trade = createDataVolumeRectangle(row, col, 0, 0, 0, trades_real_arr[q]/scale_factor, trades_material, years_arr[q])
        data_volume_objs.push(trade);
        trade_objs.push(trade);

        // don't push this so it's not re-sized
        var orig_trades_material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, wireframe: true, wireframe_linewidth: 10 } );
        var orig_trade = createDataVolumeRectangle(row, col, 0, 0, 0, trades_real_arr[q]/scale_factor, orig_trades_material, "")
        wire_objs.push(orig_trade)
*/
        var quote_color = 0xD4C763
        // next one is number of quote_objs

        var year_val = "" + cur_year;
        var print_year = false;
        var month_val = ""

        if(months_arr[q] == "Jan" || q == 0) {
            year_val = cur_year++;
            print_year = true;
        }

        var quotes_material = new THREE.MeshBasicMaterial( { color: quote_color } );
        var quote = createDataVolumeRectangle(data_volume_container, row, col, 0, 0, 0, totals_real_arr[q]/bar_scale_factor, quotes_material, year_val, months_arr[q], print_year);
        data_volume_objs.push(quote);
        quote_objs.push(quote);

        // don't push this so it's not re-sized
        var orig_quote_material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, wireframe_linewidth: 10 } );
        var orig_quote = createDataVolumeRectangle(data_volume_container, row, col, 0, 0, 0, totals_real_arr[q]/bar_scale_factor, orig_quote_material, "", "", false)
        wire_objs.push(orig_quote)
    }

    // Add objects to scene
    for (var i = 0, s = data_volume_objs.length; i < s; i++) {
        data_volume_container.add(data_volume_objs[i]);
    }

    // add wires to the scene
    for (var i = 0, s = wire_objs.length; i < s; i++) {
        data_volume_container.add(wire_objs[i]);
    }
    data_volume_container.position.x = 1000; // start off the screen
    data_volume_container.position.y = -50;

    addEvenMarkers(data_volume_container);

    scene.add(data_volume_container);

    if(auto_run) {
        setTimeout(function(){
            $("#Totals").html("0")
            $("#menu").hide();
            animateNxCoreDataGraph();
        }, 3*1000)
    }

    /*
    // add in button click handler for NxCoreCompression
     */
    $("#NxCoreCompression").click(function() {
        $("#menu").hide();
        animateNxCoreDataGraph();
    });
}

function addEvenMarkers(three_obj) {
    var l_material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    var  reg_nms_marker =  addTextToScene(three_obj, "Reg NMS", [1780, 800, 0], 800, 150, "100px")

    var r_geometry = new THREE.Geometry();
    r_geometry.vertices.push(new THREE.Vector3(1610, 800, 0));
    r_geometry.vertices.push(new THREE.Vector3(1610, 0, 0));

    var r_alpha_line = new THREE.Line(r_geometry, l_material);

    three_obj.add(r_alpha_line);
    marker_objs.push(reg_nms_marker)
    marker_objs.push(r_alpha_line)

    var  crash_2008_marker = addTextToScene(three_obj, "2008 Crash", [2645, 1300, 0], 1200, 150, "100px")

    var r_geometry = new THREE.Geometry();
    r_geometry.vertices.push(new THREE.Vector3(2310, 1300, 0));
    r_geometry.vertices.push(new THREE.Vector3(2310, 0, 0));

    var r_alpha_line = new THREE.Line(r_geometry, l_material);

    three_obj.add(r_alpha_line);

    marker_objs.push(crash_2008_marker)
    marker_objs.push(r_alpha_line)

    var flash_crash_marker = addTextToScene(three_obj, "Flash Crash", [3300, 1200, 0], 1200, 150, "100px")

    var r_geometry = new THREE.Geometry();
    r_geometry.vertices.push(new THREE.Vector3(3000, 1200, 0));
    r_geometry.vertices.push(new THREE.Vector3(3000, 0, 0));

    var r_alpha_line = new THREE.Line(r_geometry, l_material);

    three_obj.add(r_alpha_line);

    marker_objs.push(flash_crash_marker)
    marker_objs.push(r_alpha_line)

    var bats_ipo_marker = addTextToScene(three_obj, "BATS IPO", [4210, 1500, 0], 1200, 150, "100px")

    var r_geometry = new THREE.Geometry();
    r_geometry.vertices.push(new THREE.Vector3(3780, 1500, 0));
    r_geometry.vertices.push(new THREE.Vector3(3780, 0, 0));

    var r_alpha_line = new THREE.Line(r_geometry, l_material);

    three_obj.add(r_alpha_line);

    marker_objs.push(bats_ipo_marker)
    marker_objs.push(r_alpha_line)

    var fb_ipo_marker = addTextToScene(three_obj, "FB IPO", [4285, 1700, 0], 1200, 150, "100px")

    var r_geometry = new THREE.Geometry();
    r_geometry.vertices.push(new THREE.Vector3(3860, 1700, 0));
    r_geometry.vertices.push(new THREE.Vector3(3860, 0, 0));

    var r_alpha_line = new THREE.Line(r_geometry, l_material);

    three_obj.add(r_alpha_line);

    marker_objs.push(fb_ipo_marker)
    marker_objs.push(r_alpha_line)

    var knightmare_marker =  addTextToScene(three_obj, "Knightmare", [4224, 1900, 0], 1200, 150, "100px")

    var r_geometry = new THREE.Geometry();
    r_geometry.vertices.push(new THREE.Vector3(3950, 1900, 0));
    r_geometry.vertices.push(new THREE.Vector3(3950, 0, 0));

    var r_alpha_line = new THREE.Line(r_geometry, l_material);

    three_obj.add(r_alpha_line);

    marker_objs.push(knightmare_marker)
    marker_objs.push(r_alpha_line)

    var twitter_marker = addTextToScene(three_obj, "Twitter", [4495, 2100, 0], 1200, 150, "100px")

    var r_geometry = new THREE.Geometry();
    r_geometry.vertices.push(new THREE.Vector3(4200, 2100, 0));
    r_geometry.vertices.push(new THREE.Vector3(4200, 0, 0));

    var r_alpha_line = new THREE.Line(r_geometry, l_material);

    three_obj.add(r_alpha_line);

    marker_objs.push(twitter_marker)
    marker_objs.push(r_alpha_line)
}

function fadeOutMakers() {
    for(var i =0; i < marker_objs.length; i++) {
        var tween2 = new TWEEN.Tween(marker_objs[i].materials[0]).to({
            opacity: 0.0
        }, 1000).easing(TWEEN.Easing.Linear.None).onComplete(function () {

        }).start();
    }
}

function fadeInMarkers() {
    for(var i =0; i < marker_objs.length; i++) {
        var tween2 = new TWEEN.Tween(marker_objs[i].materials[0]).to({
            opacity: 1.0
        }, 1000).easing(TWEEN.Easing.Linear.None).onComplete(function () {

            }).start();
    }
}

function animateNxCoreDataGraph() {
    // disable mouse look and flythrough
    enable_fly_through = false;

    // activate this renderer no matter what.
    // wish there was a "fade" between the two

    // move the camera into position
    var tween = new TWEEN.Tween(camera.position).to({
        x: 0,
        y: 0,
        z: 1000
    }, 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            //do nothing
        }).onComplete(function () {

            active_renderer_index = 0;
            render_list[1].domElement.style.display="none";
            render_list[0].domElement.style.display="block";

            // start the data load
            var tween = new TWEEN.Tween(data_volume_container.position).to({
                x: 465,
                y: -50
            }, 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                    //do nothing
                }).onComplete(function () {
                      moveToRegNMS()
                     //moveToRegNMSShort()
                    //slideLeft(10)
                }).start();
        }).start();
}

function moveToRegNMS() {
    var tween = new TWEEN.Tween(data_volume_container.position).to({
        x: -970,
        z: -50,
        y: -100
    }, compress_time*2*1000).easing(TWEEN.Easing.Linear.None).onComplete(function () {
        var tween2 = new TWEEN.Tween(data_volume_container.position).to({
            x: -1175,
            y: -550,
            z: -1613
            }, 1000).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                setTimeout(function(){
                    // count 40 - 86 things
                    var rev_interval = setInterval(function() {
                        num_slide++;
                        $('#Totals').html(trades_twenty_arr[num_slide]);
                        if(num_slide >= 86) {
                            clearInterval(rev_interval)
                        }
                    }, compress_time*1000/46)

                    var tween = new TWEEN.Tween(data_volume_container.position).to({
                            x: -1850,
                            y: -550,
                            z: -1613
                        }, compress_time*1000).easing(TWEEN.Easing.Linear.None).onComplete(function () {

                            // count down the rest
                            var rev_interval = setInterval(function() {
                                num_slide++;
                                $('#Totals').html(trades_twenty_arr[num_slide]);
                                if(num_slide >= trades_twenty_arr.length) {
                                    clearInterval(rev_interval)
                                }
                            }, compress_time*1000/70)

                            var tween = new TWEEN.Tween(data_volume_container.position).to({
                                x: -2100,
                                y: -1050,
                                z: z_fits_it_sits
                            }, 5 * 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                    //camera.lookAt(sphere.position);
                                }).onComplete(function () {

                                    //fadeOutMakers();

                                    setTimeout(function(){
                                        // scale down all the objects by 20x to represent NxCore data compression
                                        applyNxCoreCompression(compress_time);
                                        setTimeout(function(){
                                            // scale back all the objects by 20x to represent NxCore data compression
                                            undoNxCoreCompression(compress_time)
                                            //camera.lookAt(sphere.position);
                                        },compress_time*2*1000);
                                    },1000*compress_time);

                                }).start();
                        }).start();
            }, 1000)
        }).start();
    }).start();


    // count the first 40 things
    var rev_interval = setInterval(function() {
        num_slide++;
        $('#Totals').html(trades_twenty_arr[num_slide]);
        if(num_slide >= 40) {
            clearInterval(rev_interval)
        }
    }, compress_time*2*1000/40)
}


function moveToRegNMSShort() {
    var tween = new TWEEN.Tween(data_volume_container.position).to({
        x: -2100,
        y: -1050,
        z: z_fits_it_sits
    }, 5 * 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            //camera.lookAt(sphere.position);
        }).onComplete(function () {


            setTimeout(function(){
                // scale down all the objects by 20x to represent NxCore data compression
                applyNxCoreCompression(compress_time);
                setTimeout(function(){
                    // scale back all the objects by 20x to represent NxCore data compression
                    undoNxCoreCompression(compress_time)
                    //camera.lookAt(sphere.position);
                },compress_time*1000);
            },1000*compress_time);

        }).start();
}

function applyNxCoreCompression(pause_sec) {
    var scale = 0.05;
    for(var k=0; k < data_volume_objs.length; k++){

        var orig_y = data_volume_objs[k].position.y;

        var tween = new TWEEN.Tween(data_volume_objs[k].scale).to({
            y:scale
        }).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            }).onComplete(function () {
            }).start();

        var tween = new TWEEN.Tween(data_volume_objs[k].position).to({
            y: orig_y*scale
        }).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            }).onComplete(function () {
            }).start();
    }
}

// move to another function so it wasn't done multiple times
function undoNxCoreCompression(pause_sec) {
    var grow_scale = 1.0;
    for(var k=0; k < data_volume_objs.length; k++){
        var tween = new TWEEN.Tween(data_volume_objs[k].scale).to({
            y:grow_scale
        }).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            }).onComplete(function () {
            },1000*pause_sec).start();

        var tween = new TWEEN.Tween(data_volume_objs[k].position).to({
            y: totals_real_arr[k]/bar_scale_factor/2
        }).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            }).onComplete(function () {
            },1000*pause_sec).start();
    }

    // only do this once!
    setTimeout(function(){

       // fadeInMarkers();

        // rotate to face the back
        var tween = new TWEEN.Tween(data_volume_container.rotation).to({
            y: Math.PI/2
        }).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            }).onComplete(function () {
            },1000*pause_sec*2).start();

        // move graph to better position
        var tween = new TWEEN.Tween(data_volume_container.position).to({
            x: -300,
            y: 0,
            z: 0
        }).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            }).onComplete(function () {

                // fly to the end
                var tween = new TWEEN.Tween(data_volume_container.position).to({
                    x: 20,
                    y: 30,
                    z: 8000
                }).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                    }).onComplete(function () {

                    },1000*4*pause_sec).start();

                var num_slide_back = trades_twenty_arr.length;
                // count backwards
                var rev_interval = setInterval(function() {
                    num_slide_back--;
                    $('#Totals').html(trades_twenty_arr[num_slide_back]);
                    if(num_slide_back == 0) {
                        $('#Totals').html("0");
                        $("#star_map_title").html("")
                        clearInterval(rev_interval)
                    }
                }, 1)

            },1000*2*pause_sec).start();

    },1000*(pause_sec+1) )
}


function slideLeft(time_out) {

    var new_z = data_volume_container.position.z;
    var new_y = data_volume_container.position.y;

    if (num_slide == 40 || num_slide == 86) {
        new_z = data_volume_container.position.z + (z_fits_it_sits / 2.2);
        new_y = data_volume_container.position.y + (-1000 / 2);
    }

    if (num_slide == 40 || num_slide == 41 || num_slide == 86 || num_slide == 87) {
        alert(data_volume_container.position.x + ":" + data_volume_container.position.y + ":" + data_volume_container.position.z)
    }

    $('#Totals').html(trades_twenty_arr[num_slide]);

    setTimeout(function () {
        var tween = new TWEEN.Tween(data_volume_container.position).to({
            x: data_volume_container.position.x - 35,
            z: new_z,
            y: new_y
        }, 200).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                //camera.lookAt(sphere.position);
            }).onComplete(function () {
                //cur_x -= data_volume_objs[1].width;
                //applyNxCoreCompression();
                if (num_slide <= 86) {
                    slideLeft(time_out * 1.05)
                    num_slide++;
                } else {

                    // count down the rest
                    var rev_interval = setInterval(function () {
                        num_slide++;
                        $('#Totals').html(trades_twenty_arr[num_slide]);
                        if (num_slide >= trades_twenty_arr.length) {
                            clearInterval(rev_interval)
                        }
                    })

                    var tween = new TWEEN.Tween(data_volume_container.position).to({
                        x: -2100,
                        y: -1050,
                        z: z_fits_it_sits
                    }, sec_to_move * 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            //camera.lookAt(sphere.position);
                        }).onComplete(function () {

                            var pause_sec = 5;

                            setTimeout(function () {
                                // scale down all the objects by 20x to represent NxCore data compression
                                applyNxCoreCompression(pause_sec);
                                setTimeout(function () {
                                    // scale back all the objects by 20x to represent NxCore data compression
                                    undoNxCoreCompression(pause_sec)
                                    //camera.lookAt(sphere.position);
                                }, 30 * 1000);
                            }, 1000 * pause_sec);

                        }).start();
                }
            }).start();
    }, time_out)
}




