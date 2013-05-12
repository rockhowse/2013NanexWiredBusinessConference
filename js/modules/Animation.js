
function loadStarmap(star_map_index) {

    // reset the volume container to the mid always for consistency
    //data_volume_container.position.x =  -2100;
    //data_volume_container.position.y =  -1050;
    //data_volume_container.position.z = z_fits_it_sits;

    // this used to animate but that has been moved to the buildMapFromHistoricalData() for better syncronization
    if(star_map_index == 0) {
        loadBatsStarMap(scene, camera);
    } else if(star_map_index == 1) {
        loadFacebookStarMap(scene, camera);
    } else if (star_map_index == 2) {
        loadKCGStarMapGrid(scene, camera);
    } else if (star_map_index == 3) {
        borg_container = null;// make it eligible for GC
        loadTweetFallStarMap(scene, camera)
    } else if (star_map_index == 4) {
        loadFlashCrashStarMapGrid(scene, camera);
    }
}

var sec_to_move = 2;
var sec_per_stage = 5;

function flyToDay(graph_loc, star_map, zoom_x, star_map_index) {
    var max = Math.max(star_map.p_x_offset, star_map.p_y_offset);
    var new_z = max*4;

    showStarmapInfo(star_map.star_map_info);

    playAnimation(star_map, star_map_index);

    /* was used to zoom through container
    // move this to the X loc specified
    var tween = new TWEEN.Tween(data_volume_container.position).to({
        x: graph_loc
    }, sec_to_move * 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
        }).onComplete(function () {

            // move the volume container behind us
            var tween = new TWEEN.Tween(data_volume_container.position).to({
                y: -50,
                z: 1100
            }, sec_to_move * 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                }).onComplete(function () {
                    setTimeout(function() {
                        playAnimation(star_map, star_map_index)
                        //returnFromDay(star_map, star_map_index);
                    }, 1000)
                }).start();
        }).start();
     */
}

// this function returns the camra back to it's position ready to fly back into another day
function returnFromDay(three_obj, star_map_index) {
/* this used to hide the data container, no longer zooming through it
    // slide data_volume_container back along the z access
    var tween = new TWEEN.Tween(data_volume_container.position).to({
        z: z_fits_it_sits
    }, 3 * 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            // do nothing
        }).onComplete(function () {

            // now put it back in the middle
            var tween = new TWEEN.Tween(data_volume_container.position).to({
                x: -2100,
                y: -1050,
                z: z_fits_it_sits
            }, 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                    // do nothing
                }).onComplete(function () {
                    hideStarmapInfo()
                    // load the next starmap
                    //loadStarmap(++star_map_index)
                }).start();
        }).start();
*/

    // hide the starmap info
    hideStarmapInfo()

    // slide star_map back behind other plane
    var tween = new TWEEN.Tween(three_obj.position).to({
        z: hide_plane_x-5000
    }, sec_to_move * 1000/4).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            // do nothing
        }).onComplete(function () {
        }).start();
}

showStarmapInfo = function (star_map_info) {
    $('#star_map_title').show()
    $('#star_map_date').show()
    $('#star_map_time').show()
    $('#star_map_description').show()
    $('#star_map_title').html("" + star_map_info.title);
    $('#star_map_date').html("" + star_map_info.date);
    $('#star_map_time').html("" + star_map_info.time);
    $('#star_map_description').html("" + star_map_info.description);
}

hideStarmapInfo = function() {
    $('#star_map_title').hide()
    $('#star_map_date').hide()
    $('#star_map_time').hide()
    $('#star_map_description').hide()
}

// play animation based on index and debug
playAnimation = function (star_map, star_map_index){

    if(star_map_index == 0) {
        if(enable_debug) {
            playRotationAnimation(star_map);
        } else {
            hideStarmapInfo(star_map.star_map_info);
            playBatsAnimationBackward(star_map,star_map_index)
        }
    } else if(star_map_index == 1) {
        if(enable_debug) {
            playRotationAnimation(star_map);
        } else{
            playFacebookAnimation(star_map,star_map_index)
        }
    } else if (star_map_index == 2) {
        if(enable_debug) {
            playRotationAnimation(star_map, -30000, kcg_container);
        } else {
            playKCGAnimation(star_map, star_map_index)
        }
    } else if (star_map_index == 3) {
        if(enable_debug) {
            playRotationAnimation(star_map);
        } else{
            playTwitterFallAnimation(star_map, star_map_index);
        }
    } else if (star_map_index ==4) {
         if(enable_debug) {
            playRotationAnimation(star_map, 40000, borg_container, true);
        } else{
            playFlashcrashBorgAnimation(star_map, star_map_index);
        }
    }
}


/**
 * Generic animation that rotates to flat and back
 *
 * @param star_map
 */
playRotationAnimation = function (star_map, new_z_override, star_map_container, use_container_for_star_map){
    var max = Math.max(star_map.p_x_offset, star_map.p_y_offset);
    var new_z = max*4;

    if(new_z_override && new_z_override != 0){
        new_z = new_z_override;
    }

    // stop animation
    rotate_star_map = false;

    var sec_per_stage = 3;

    var cur_star_map = star_map.hist_star_map;
    var container = cur_star_map;

    // if we pass in a container, we want to zoom that first so we can rotate local axis
    if(star_map_container != null && star_map_container) {
        container = star_map_container;
    }

    // for the last one, we want to rotate the entire container, not just the first starmap
    if(use_container_for_star_map) {
        cur_star_map = container;
    }

    // move the starmap up to 0
    var tween = new TWEEN.Tween(container.position).to({
        z: 0
    }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
            // do nothing
        }).onComplete(function () {
        var tween = new TWEEN.Tween(cur_star_map.rotation).to({
            z: Math.PI/2,
            x: -Math.PI/2.4
        }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                // do nothing
            }).onComplete(function () {

                var tween = new TWEEN.Tween(cur_star_map.rotation).to({
                    z: 0,
                    x: 0
                }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                        // do nothing
                    }).onComplete(function () {

                    }).start();

                /*
                 var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                 z: cur_star_map.position.z+(star_map.p_x_offset*2)+new_z/2,
                 y: cur_star_map.position.y-2000
                 }, sec_per_sage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                 // do nothing
                 }).onComplete(function () {
                 var tween = new TWEEN.Tween(cur_star_map.rotation).to({
                 z: -Math.PI/2
                 }, sec_per_sage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                 // do nothing
                 }).onComplete(function () {
                 var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                 z: cur_star_map.position.z-(cur_star_map.p_x_offset)*2
                 }, sec_per_sage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                 // do nothing
                 }).onComplete(function () {

                 }).start();
                 }).start();
                 }).start();
                 */
            }).start();
    }).start();

    // move the camera back to a decent spot
    var tween = new TWEEN.Tween(camera.position).to({
        z: new_z
    }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
            // do nothing
        }).onComplete(function () {
            // do nothing
   }).start();
}

playBatsAnimationBackward = function (star_map, star_map_index){
    var max = Math.max(star_map.p_x_offset, star_map.p_y_offset);
    var new_z = max*4;

    // stop animation
    rotate_star_map = false;

    var cur_star_map = star_map.hist_star_map;

    // rotate to the side with slight angle up the plane
    var tween = new TWEEN.Tween(cur_star_map.rotation).to({
        z: Math.PI/2,
        x: -Math.PI/2
    }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
        }).onComplete(function () {
            var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                x: 6120,
                z: -2103,
                y: -75
            }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                    // do nothing
                }).onComplete(function () {

                    // start video
                    video.play()

                    setTimeout(function() {

                        showStarmapInfo(star_map.star_map_info)
                        // rotate to the side with slight angle up the plane
                        var tween = new TWEEN.Tween(cur_star_map.rotation).to({
                            x: 0,
                            z: 0
                        }, sec_per_stage* 1000*2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            }).onComplete(function () {
                        }).start();

                        // zoom back out so you can see whole graph
                        var tween = new TWEEN.Tween(cur_star_map.position).to({
                            z: -40000,
                            y: -3000,
                            x: cur_star_map.position.x - 2000
                        }, sec_per_stage* 1000*2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            }).onComplete(function () {

                                setTimeout(function() {
                                      returnToHome(cur_star_map, new_z, star_map_index);
                                }, sec_per_stage*1000*3)//

                            }).start();

                    }, 88*1000)//
                }).start();
    }).start();

/*
    // move up to the mid point
    var tween = new TWEEN.Tween(cur_star_map.position).to({
        z: -60440 // hard coded best position
    }, sec_per_stage* 1000/2).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
            // do nothing
        }).onComplete(function () {

            // rotate to the side with slight angle up the plane
            var tween = new TWEEN.Tween(cur_star_map.rotation).to({
                z: Math.PI/2,
                x: -Math.PI/2.4
            }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                }).onComplete(function () {

                    var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                        x: cur_star_map.position.x+star_map.p_y_offset-500,
                        z: cur_star_map.position.z+(star_map.p_x_offset*2)
                    }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            // do nothing
                        }).onComplete(function () {

                            var new_x = cur_star_map.position.x-1195;
                            var new_y = cur_star_map.position.z+6580+ new_z/4;
                            var new_new_z = cur_star_map.position.y+725;

                            //6121, -2020, 725

                            alert(new_x + ":" + new_y + ":" + new_new_z)

                            var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                                x: new_x,
                                z: new_y,
                                y: new_new_z
                            }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                    // do nothing
                                }).onComplete(function () {

                                    // start video
                                    video.play()

                                    setTimeout(function() {
                                        returnToHome(cur_star_map, new_z, star_map_index);
                                    }, 73*1000)
                                }).start();
                        }).start();

                }).start();

            // update the markers to face the camera
            // tried doing lookAt(camera.position) but evidently there is an issue with children if you rotate the parent
            for(var i=0; i < star_map.marker_labels.length;i++) {
                // rotate to the side with slight angle up the plane
                var tween = new TWEEN.Tween(star_map.marker_labels[i][4].rotation).to({
                    y: Math.PI/-2,
                    x: Math.PI/2
                }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                    }).onComplete(function () {
                    }).start();
            }

            // delay and return
            setTimeout(function() {
                for(var i=0; i < star_map.marker_labels.length;i++) {
                    var tween = new TWEEN.Tween(star_map.marker_labels[i][4].rotation).to({
                        y: 0,
                        x: 0
                    }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                            // do nothing
                        }).onComplete(function () {
                            // do nothing
                        }).start();
                }
            }, sec_per_stage*1000*3)
        }).start();
 */
}

playBatsAnimationForward = function (star_map, star_map_index){
    var max = Math.max(star_map.p_x_offset, star_map.p_y_offset);
    var new_z = max*4;

    // stop animation
    rotate_star_map = false;

    var cur_star_map = star_map.hist_star_map;

    // move up to the mid point
    var tween = new TWEEN.Tween(cur_star_map.position).to({
        z: -60440 // hard coded best position
    }, sec_per_stage* 1000/2).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
            // do nothing
        }).onComplete(function () {

        // rotate to the side with slight angle up the plane
        var tween = new TWEEN.Tween(cur_star_map.rotation).to({
            z: Math.PI/2,
            x: -Math.PI/2.4
        }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
        }).onComplete(function () {

                var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                    x: cur_star_map.position.x+star_map.p_y_offset-500,
                    z: cur_star_map.position.z+(star_map.p_x_offset*2)
                }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                        // do nothing
                    }).onComplete(function () {

                        var new_x = cur_star_map.position.x-1195;
                        var new_y = cur_star_map.position.z+6580+ new_z/4;
                        var new_new_z = cur_star_map.position.y+725;

                        var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                            x: new_x,
                            z: new_y,
                            y: new_new_z
                        }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                // do nothing
                            }).onComplete(function () {

                                // start video
                                video.play()

                            setTimeout(function() {
                                returnToHome(cur_star_map, new_z, star_map_index);
                            }, 117*1000)
                        }).start();
                    }).start();

        }).start();

        // update the markers to face the camera
        // tried doing lookAt(camera.position) but evidently there is an issue with children if you rotate the parent
        for(var i=0; i < star_map.marker_labels.length;i++) {
            // rotate to the side with slight angle up the plane
            var tween = new TWEEN.Tween(star_map.marker_labels[i][4].rotation).to({
                y: Math.PI/-2,
                x: Math.PI/2
            }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                }).onComplete(function () {
                }).start();
        }

        // delay and return
        setTimeout(function() {
            for(var i=0; i < star_map.marker_labels.length;i++) {
                var tween = new TWEEN.Tween(star_map.marker_labels[i][4].rotation).to({
                    y: 0,
                    x: 0
                }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                        // do nothing
                    }).onComplete(function () {
                        // do nothing
                    }).start();
            }
        }, sec_per_stage*1000*3)
    }).start();
}

playFacebookAnimation = function (star_map, star_map_index){
    var max = Math.max(star_map.p_x_offset, star_map.p_y_offset);
    var new_z = max*4;

    // stop animation
    rotate_star_map = false;

    var cur_star_map = star_map.hist_star_map;

    cur_star_map.position.z = -new_z

    // rotate to the side with slight angle up the plane
    var tween = new TWEEN.Tween(cur_star_map.position).to({
        z: -new_z/2
    }, sec_per_stage* 1000*2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
        }).onComplete(function () {
        // rotate to the side with slight angle up the plane
        var tween = new TWEEN.Tween(cur_star_map.rotation).to({
            z: Math.PI/2,
            x: -Math.PI/2.1
        }, sec_per_stage* 1000*2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            }).onComplete(function () {

                var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                    z: cur_star_map.position.z + star_map.p_x_offset*1.7,
                    y: cur_star_map.position.y
                }, sec_per_stage* 1000*2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                        // do nothing
                    }).onComplete(function () {

                        var tween2 = new TWEEN.Tween(cur_star_map.rotation).to({
                            x: 0
                        }, sec_per_stage* 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                // do nothing
                            }).onComplete(function () {

                                // 1 second, fool em into thinking we are continuing
                                setTimeout(function(){

                                    // back to the angle
                                    var tween2 = new TWEEN.Tween(cur_star_map.rotation).to({
                                        x: -Math.PI/4.5
                                    }, sec_per_stage* 1000/4).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                            // do nothing
                                        }).onComplete(function () {
                                            // 17 seconds of silence!
                                            setTimeout(function(){

                                                // back to the angle
                                                var tween2 = new TWEEN.Tween(cur_star_map.rotation).to({
                                                    x: -Math.PI/2.1
                                                }, sec_per_stage* 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                        // do nothing
                                                    }).onComplete(function () {
                                                    }).start();

                                                // zoom back a bit
                                                var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                                                    z: cur_star_map.position.z + new_z/8,
                                                    x: cur_star_map.position.x + 4500

                                                }, sec_per_stage* 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                        // do nothing
                                                    }).onComplete(function () {

                                                        // zoom back a bit
                                                        var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                                                            z: cur_star_map.position.z + star_map.p_x_offset*1.1,
                                                            y: cur_star_map.position.y - 6000
                                                        }, sec_per_stage* 1000/2).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                                                                // do nothing
                                                            }).onComplete(function () {
                                                                returnToHome(cur_star_map, new_z, star_map_index)
                                                            }).start();

                                                    }).start();
                                            }, 15*1000)
                                        }).start();

                                    // zoom back a bit
                                    var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                                        z: cur_star_map.position.z + star_map.p_x_offset*0.2
                                    }, sec_per_stage* 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                            // do nothing
                                        }).onComplete(function () {


                                        }).start();
                            }, 1000)

                        }).start();

                        // zoom back a bit
                        var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                            z: cur_star_map.position.z -new_z/8
                        }, sec_per_stage* 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                // do nothing
                            }).onComplete(function () {

                            }).start();

                    }).start();
            }).start();

        // update the markers to face the camera
        // tried doing lookAt(camera.position) but evidently there is an issue with children if you rotate the parent
        for(var i=0; i < star_map.marker_labels.length;i++) {
            // rotate to the side with slight angle up the plane
            var tween = new TWEEN.Tween(star_map.marker_labels[i][4].rotation).to({
                y: Math.PI/-2,
                x: Math.PI/2
            }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                }).onComplete(function () {
                }).start();
        }
    }).start();
}

playTwitterFallAnimation = function (star_map, star_map_index){
    var max = Math.max(star_map.p_x_offset, star_map.p_y_offset);
    var new_z = max*4;

    // stop animation
    rotate_star_map = false;

    var cur_star_map = star_map.hist_star_map;

    var tween = new TWEEN.Tween(cur_star_map.position).to({
        y: star_map.hist_star_map.position.y - 15000, //-4000,
        x: star_map.hist_star_map.position.y - 5000,
        z: -25000
    }, sec_per_stage * 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
        }).onComplete(function () {

            setTimeout(function () {

                /*
                // zoom in to the BATS IPO day
                var tween = new TWEEN.Tween(data_volume_container.position).to({
                    y: -50,
                    z: 10000 + new_z // move it 10k + the new z location we want it to be behind us
                }, sec_per_stage * 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                        // do nothing
                    }).onComplete(function () {
                    }).start();
                */

                var tween = new TWEEN.Tween(cur_star_map.position).to({
                    x: 0,
                    y: 0,
                    z: -new_z
                }, sec_per_stage * 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                        // do nothing
                    }).onComplete(function () {

                        // rotate to the side with slight angle up the plane
                        var tween = new TWEEN.Tween(cur_star_map.rotation).to({
                            z: Math.PI/2,
                            x: -Math.PI/2.1
                        }, sec_per_stage* 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            }).onComplete(function () {

                                var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                                    z: cur_star_map.position.z + star_map.p_x_offset*2.5,
                                    y: -10000
                                }, sec_per_stage* 1000/4).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                        // do nothing
                                    }).onComplete(function () {

                                            var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                                                z: cur_star_map.position.z + star_map.p_x_offset,
                                                y: -1000
                                            }, sec_per_stage* 1000/4).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                    // do nothing
                                                }).onComplete(function () {
                                                    var tween2 = new TWEEN.Tween(cur_star_map.position).to({
                                                        z: cur_star_map.position.z + star_map.p_x_offset*1.6,
                                                        y: cur_star_map.position.y - 1600
                                                    }, sec_per_stage* 1000/4).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                              // do nothing
                                                        }).onComplete(function () {
                                                            hideStarmapInfo()
                                                            /*
                                                            returnToHome(cur_star_map, new_z, star_map_index )
                                                             */
                                                        }).start();
                                                }).start();

                                    }).start();
                            }).start();

                        // update the markers to face the camera
                        // tried doing lookAt(camera.position) but evidently there is an issue with children if you rotate the parent
                        for(var i=0; i < star_map.marker_labels.length;i++) {
                            // rotate to the side with slight angle up the plane
                            var tween = new TWEEN.Tween(star_map.marker_labels[i][4].rotation).to({
                                y: Math.PI/-2,
                                x: Math.PI/2
                            }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                }).onComplete(function () {
                                }).start();
                        }
                    }).start();
                //  }).start();
            }, sec_per_stage * 1000)
        }).start();
}

playKCGAnimation = function (star_map, star_map_index){

    // star_map isn't used...
    var front_star_map = hist_star_maps[0];
    var back_star_map = hist_star_maps[1];

    var front_max = Math.max(front_star_map.p_x_offset, front_star_map.p_y_offset);
    var front_new_z = 35000
        //front_max*4;

    var back_new_z = 97492+230000
        //front_new_z+ (-1*hide_plane_x/1.5);

    // zoom forward to first starmap (daily)
    var tween = new TWEEN.Tween(kcg_container.position).to({
        z: front_new_z
    }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
            // do nothing
        }).onComplete(function () {
            var tween = new TWEEN.Tween(kcg_container.position).to({
                x: kcg_container.position.x + front_star_map.p_y_offset*6.6,
                y: kcg_container.position.y - 2850,
                z: front_new_z + 42000
            }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                    // do nothing
                }).onComplete(function () {

                    setTimeout(function(){
                        var tween = new TWEEN.Tween(kcg_container.position).to({
                            x: kcg_container.position.x - front_star_map.p_y_offset*3.5,
                            z: front_new_z + 40000
                        }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                // do nothing
                            }).onComplete(function () {

                                setTimeout(function(){
                                    returnToHome(front_star_map.hist_star_map, front_new_z*2, star_map_index )
                                }, sec_per_stage* 1000*2)

                            }).start();
                    },sec_per_stage* 1000*3)

                }).start();
            /*
            // zoom forward to second startmap(open)
            var tween = new TWEEN.Tween(kcg_container.position).to({
                z: back_new_z
            }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                    // do nothing
                }).onComplete(function () {

                    //zoom in for close left hand side of starmap
                    var tween = new TWEEN.Tween(kcg_container.position).to({
                        z: kcg_container.position.z + (back_new_z-230000)/3,
                        x: kcg_container.position.x + back_star_map.p_y_offset*4
                    }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                            // do nothing
                        }).onComplete(function () {

                            //zoom in to show the two "outages"
                            var tween = new TWEEN.Tween(kcg_container.position).to({
                                z: kcg_container.position.z + (back_new_z-230000)/4,
                                x: kcg_container.position.x - back_star_map.p_y_offset
                            }, sec_per_stage* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                                    // do nothing
                                }).onComplete(function () {
                                    returnToHome(kcg_container, front_new_z, star_map_index);
                                }).start();

                        }).start();

                }).start();
            */

        }).start();
}

showFlashCrashVideo = function() {

   $("#fc_video_tag").show()
   $("#fc_video_tag").get(0).play();
}

playFlashcrashBorgAnimation = function (star_map_index){

    var front_star_map = hist_star_maps[0];

    var front_max = Math.max(front_star_map.p_x_offset, front_star_map.p_y_offset);
    var front_new_z = front_max*4;

    var borg_speed = sec_per_stage/1.5;

    // zoom forward to first starmap (flash crash)
    var tween = new TWEEN.Tween(borg_container.position).to({
        z: -40000 // hard coded for now
    }, borg_speed* 1000/2).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
            // do nothing
        }).onComplete(function () {
        var tween = new TWEEN.Tween(borg_container.rotation).to({
            z: Math.PI/2,
            x: -Math.PI/2.4
        }, borg_speed* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                // do nothing
            }).onComplete(function () {

                var tween = new TWEEN.Tween(borg_container.position).to({
                    y: 5000*4
                }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                        // do nothing
                    }).onComplete(function () {

                        var tween = new TWEEN.Tween(borg_container.rotation).to({
                            z: -Math.PI/120
                        }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                // do nothing
                            }).onComplete(function () {
                                var tween = new TWEEN.Tween(borg_container.position).to({
                                    y: borg_container.position.y - 5000*3
                                }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                        // do nothing
                                    }).onComplete(function () {
                                        var tween = new TWEEN.Tween(borg_container.rotation).to({
                                            z: -Math.PI/2
                                        }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                // do nothing
                                            }).onComplete(function () {
                                                var tween = new TWEEN.Tween(borg_container.position).to({
                                                    y: 5000*4
                                                }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                        // do nothing
                                                    }).onComplete(function () {
                                                        var tween = new TWEEN.Tween(borg_container.rotation).to({
                                                            z: -Math.PI
                                                        }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                                // do nothing
                                                            }).onComplete(function () {
                                                                var tween = new TWEEN.Tween(borg_container.position).to({
                                                                    y: borg_container.position.y - 5000*3
                                                                }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                                        // do nothing
                                                                    }).onComplete(function () {
                                                                         var tween = new TWEEN.Tween(borg_container.position).to({
                                                                         x: borg_container.position.x + 11500
                                                                         }, borg_speed* 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                                         // do nothing
                                                                         }).onComplete(function () {

                                                                         var tween = new TWEEN.Tween(borg_container.position).to({
                                                                         z: borg_container.position.z + 50000,
                                                                         y: borg_container.position.y - 6400
                                                                         }, borg_speed* 1000/2).easing(TWEEN.Easing.Linear.None).onUpdate(function () {

                                                                         }).onComplete(function () {
                                                                                 var tween = new TWEEN.Tween(borg_container.position).to({
                                                                                     z: borg_container.position.z + 6000,
                                                                                     y: borg_container.position.y - 2000
                                                                                 }, borg_speed* 1000/7).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                                                         hideStarmapInfo()
                                                                                     }).onComplete(function () {
                                                                                         showFlashCrashVideo();
                                                                                     }).start();

                                                                         }).start();

                                                                         var tween = new TWEEN.Tween(borg_container.rotation).to({
                                                                         x: -Math.PI/2.2
                                                                         }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                                         // do nothing
                                                                         }).onComplete(function () {

                                                                         }).start();
                                                                         }).start();
                                                                    }).start();
                                                            }).start();

                                                        // rotate labels
                                                        for(var j=0; j < hist_star_maps.length; j++) {

                                                            var cur_star_map = hist_star_maps[j];

                                                            for(var i=0; i < cur_star_map.marker_labels.length;i++) {
                                                                // rotate to the side with slight angle up the plane
                                                                var tween = new TWEEN.Tween(cur_star_map.marker_labels[i][4].rotation).to({
                                                                    y: Math.PI
                                                                }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                                    }).onComplete(function () {
                                                                    }).start();
                                                            }
                                                        }
                                                    }).start();
                                            }).start();
                                        // rotate labels
                                        for(var j=0; j < hist_star_maps.length; j++) {

                                            var cur_star_map = hist_star_maps[j];

                                            for(var i=0; i < cur_star_map.marker_labels.length;i++) {
                                                // rotate to the side with slight angle up the plane
                                                var tween = new TWEEN.Tween(cur_star_map.marker_labels[i][4].rotation).to({
                                                    y: Math.PI/2
                                                }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                                    }).onComplete(function () {
                                                    }).start();
                                            }
                                        }
                                    }).start();
                            }).start();

                        // roate labels
                        for(var j=0; j < hist_star_maps.length; j++) {

                            var cur_star_map = hist_star_maps[j];

                            for(var i=0; i < cur_star_map.marker_labels.length;i++) {
                                // rotate to the side with slight angle up the plane
                                var tween = new TWEEN.Tween(cur_star_map.marker_labels[i][4].rotation).to({
                                    y: -Math.PI/120
                                }, borg_speed* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                    }).onComplete(function () {
                                    }).start();
                            }
                        }
                    }).start();
            }).start();

        // move the labels to face the camera since when rotating the parent, the object.lookAt(camera.position) doesn't work?
        // update the markers to face the camera
        // tried doing lookAt(camera.position) but evidently there is an issue with children if you rotate the parent
        for(var j=0; j < hist_star_maps.length; j++) {

            var cur_star_map = hist_star_maps[j];

            for(var i=0; i < cur_star_map.marker_labels.length;i++) {
                // rotate to the side with slight angle up the plane
                var tween = new TWEEN.Tween(cur_star_map.marker_labels[i][4].rotation).to({
                    y: Math.PI/-2,
                    x: Math.PI/2
                }, borg_speed* 1000).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function () {
                    }).onComplete(function () {
                    }).start();
            }
        }
    }).start();
}

returnToHome  = function(three_obj, new_z, star_map_index) {

    var tween = new TWEEN.Tween(three_obj.rotation).to({
        z: 0,
        x: 0
    }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            // do nothing
        }).onComplete(function () {
        }).start();

    var tween = new TWEEN.Tween(three_obj.position).to({
        y: 0,
        x: 0,
        z: -new_z*2
    }, sec_per_stage* 1000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
            // do nothing
        }).onComplete(function () {
            returnFromDay(three_obj, star_map_index)
        }).start();
}

